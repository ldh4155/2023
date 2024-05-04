package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.AuctionDto;
import com.ilgoojo.backend.dto.BidDto;
import com.ilgoojo.backend.entity.Auction;
import com.ilgoojo.backend.service.AuctionService;
import com.ilgoojo.backend.service.FileStorageService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController // 모든 경매 관련 엔드포인트의 기본 URL
public class AuctionController {
    private final AuctionService auctionService;

    public AuctionController(AuctionService auctionService,FileStorageService fileStorageService) {
        this.auctionService = auctionService;
    }

    // 경매 목록 조회
    @GetMapping("/auctions")
    public List<Auction> getAllAuctions() {

        return auctionService.getAuctionList();
    }



    // 특정 경매 조회
    @GetMapping("auctions/{auctionId}")
    public BidDto getAuctionById(@PathVariable Integer auctionId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return auctionService.getAuctionById(auctionId);
    }

    // 새로운 경매 등록
    @PostMapping(path = "/auctions", consumes = "multipart/form-data")
    public Auction createAuction(@RequestParam("title") String title,
                                           @RequestParam("startPrice") Integer startPrice,
                                           @RequestParam("image") MultipartFile image) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuctionDto auctionDto = new AuctionDto(title,startPrice);
        return auctionService.createAuction(auctionDto,image);
    }

    // 경매 입찰
    @PostMapping("auctions/{auctionId}/bid")
    public Auction bid(@PathVariable Integer auctionId, @RequestBody Integer amount) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return auctionService.bid(auctionId, authentication.getName(),amount);
    }
}