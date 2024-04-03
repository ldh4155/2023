package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.Auction;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AuctionController {
    private final AuctionService auctionService;

    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }
    @GetMapping("/auction/{id}")
    public Auction getAuctionById(@PathVariable Long id){
        return auctionService.getAuctionById(id);
    }
    @PostMapping("/auction/{id}/bid")
    public ResponseEntity<Auction> save(@PathVariable Long id, String bidder, Integer amount) {
        Auction auction = auctionService.bid(id, bidder, amount);
        return new ResponseEntity<>(auction, HttpStatus.CREATED);
    }

}