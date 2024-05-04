package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.AuctionDto;
import com.ilgoojo.backend.dto.BidDto;
import com.ilgoojo.backend.entity.Auction;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.ProfileImage;
import com.ilgoojo.backend.repository.AuctionRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

        return new BidDto(targetAuction.getBidder().getMemberId(),targetAuction.getAmount());
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

    public List<Auction> getAuctionList(){
        return auctionRepository.findAll();
    }

    public Auction createAuction(AuctionDto auctiondto, MultipartFile file) {
        Auction newAuction = new Auction();
        newAuction.setTitle(auctiondto.getTitle());
        newAuction.setStartPrice(auctiondto.getStartPrice());
        auctionRepository.save(newAuction);
        if(file!= null) {
            ProfileImage auctionImage = new ProfileImage();
            fileStorageService.storeAuctionImage(file, newAuction.getAuctionId());
            // 필요한 경우 추가적인 설정을 합니다.
        }
        return newAuction;
    }
}