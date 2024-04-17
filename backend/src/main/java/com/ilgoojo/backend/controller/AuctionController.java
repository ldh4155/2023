package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.AuctionDto;
import com.ilgoojo.backend.entity.Auction;
import com.ilgoojo.backend.service.AuctionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/auctions") // 모든 경매 관련 엔드포인트의 기본 URL
public class AuctionController {
    private final AuctionService auctionService;

    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    // 경매 목록 조회
    @GetMapping
    public ResponseEntity<List<Auction>> getAllAuctions() {
        List<Auction> auctions = auctionService.getAuctionList();
        if (auctions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(auctions, HttpStatus.OK);
    }

    // 특정 경매 조회
    @GetMapping("/{id}")
    public Auction getAuctionById(@PathVariable Long id) {
        return auctionService.getAuctionById(id);
    }

    // 새로운 경매 등록
    @PostMapping
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction) {
        Auction newAuction = auctionService.createAuction(auction);
        return new ResponseEntity<>(newAuction, HttpStatus.CREATED);
    }

    // 경매 입찰
    @PostMapping("/{id}/bid")
    public ResponseEntity<Auction> bid(@PathVariable Long id, @RequestBody AuctionDto auctionDto) {
        Auction auction = auctionService.bid(id, auctionDto.getBidder(), auctionDto.getAmount());
        return new ResponseEntity<>(auction, HttpStatus.CREATED);
    }
}