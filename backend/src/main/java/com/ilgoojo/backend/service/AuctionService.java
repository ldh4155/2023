package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.AuctionDto;
import com.ilgoojo.backend.dto.AuctionListDto;
import com.ilgoojo.backend.dto.BidDto;
import com.ilgoojo.backend.entity.Auction;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.ProfileImage;
import com.ilgoojo.backend.repository.AuctionRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final MemberRepository memberRepository;
    private final FileStorageService fileStorageService;

    public AuctionService(AuctionRepository auctionRepository, MemberRepository memberRepository, FileStorageService fileStorageService) {
        this.auctionRepository = auctionRepository;
        this.memberRepository = memberRepository;
        this.fileStorageService = fileStorageService;
    }

    public BidDto getAuctionById(Integer auctionId) {
        Auction targetAuction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new IllegalArgumentException("Auction not found with id: " + auctionId));
        if(targetAuction.getBidder()==null)
            return new BidDto(targetAuction.getOwner().getId(),targetAuction.getStartPrice());
        else
            return new BidDto(targetAuction.getBidder().getId(),targetAuction.getAmount());
    }

    @Transactional
    public Auction bid(Integer auctionId, String memberId, Integer amount) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid auction Id:" + auctionId));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + memberId));
        if(auction.getAmount() == null)
            auction.setAmount(0);
        if(auction.getStartPrice() == null)
            auction.setStartPrice(0);
        if(amount>auction.getAmount() && amount > auction.getStartPrice()) {
            auction.setBidder(member);
            auction.setAmount(amount);
        }

        auctionRepository.save(auction); // 변경된 내용을 저장
        return auction;
    }

    public List<AuctionListDto> getAuctionList(){

        checkAuctionsEnd();
        List<Auction> auctionList = auctionRepository.findByActivationTrue();
        List<AuctionListDto> auctionListDtoList = new ArrayList<>();

        for(Auction auction : auctionList) {
            if(auction.getActivation()) {
                AuctionListDto auctionListDto = AuctionListDto.builder()
                        .auctionId(auction.getAuctionId())
                        .title(auction.getTitle())
                        .startPrice(auction.getStartPrice())
                        .amount(auction.getAmount())
                        .imageUrl(auction.getAuctionImageId().getUrl())
                        .build();

                System.out.println(auction.getAuctionImageId().getUrl());
                auctionListDtoList.add(auctionListDto);
            }
        }

        return auctionListDtoList;



    }

    public Auction createAuction(AuctionDto auctiondto, MultipartFile file,String memberId) {
        Auction newAuction = new Auction();
        newAuction.setTitle(auctiondto.getTitle());
        newAuction.setStartPrice(auctiondto.getStartPrice());
        newAuction.setEndDate(auctiondto.getEndDate());
        newAuction.setActivation(true);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + memberId));
        newAuction.setOwner(member);
        auctionRepository.save(newAuction);
        if(file!= null) {
            ProfileImage auctionImage = new ProfileImage();
            fileStorageService.storeAuctionImage(file, newAuction.getAuctionId());
            // 필요한 경우 추가적인 설정을 합니다.
        }
        return newAuction;
    }

    public boolean endAuction(Integer auctionId, String name){
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid auction Id:" + auctionId));
        if(auction.getOwner().getId().equals(name)){
            auction.setActivation(false);
            auctionRepository.save(auction);
            return true; // 경매 비활성화 성공
        }
        else
            return false;
    }

    public List<AuctionListDto> getAuctionByOwner(String ownerId){
        return auctionRepository.findByOwner(ownerId);
    }

    public void checkAuctionsEnd() {
        List<Auction> auctions = auctionRepository.findByActivationTrueAndEndDateBefore(LocalDateTime.now());
        for (Auction auction : auctions) {
            auction.setActivation(false);
            auctionRepository.save(auction);
            // 경매 종료 시 추가 로직 (예: 알림 발송 등)
        }
    }

    public boolean checkAuctionEnd(Integer auctionId){
        Optional<Auction> targetAuction = auctionRepository.findById(auctionId);
        return targetAuction.get().getActivation();
    }
}