package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.AuctionDto;
import com.ilgoojo.backend.entity.Auction;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.AuctionRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final MemberRepository memberRepository;

    public AuctionService(AuctionRepository auctionRepository, MemberRepository memberRepository) {
        this.auctionRepository = auctionRepository;
        this.memberRepository = memberRepository;
    }

    public Auction getAuctionById(Long id) {
        return auctionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Auction not found with id: " + id));
    }

    @Transactional
    public Auction bid(Long auctionId, String bidderId, Integer amount) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid auction Id:" + auctionId));
        Member member = memberRepository.findById(bidderId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + bidderId));
        auction.setBidder(member);
        auction.setAmount(amount);

        auctionRepository.save(auction); // 변경된 내용을 저장
        return auction;
    }

    public List<Auction> getAuctionList(){
        return auctionRepository.findAll();
    }

    public Auction createAuction(Auction auction) {
        Auction newAuction = new Auction();
        newAuction.setTitle(auction.getTitle());
        newAuction.setStartPrice(auction.getStartPrice());
        // 필요한 경우 추가적인 설정을 합니다.
        return auctionRepository.save(newAuction);
    }
}