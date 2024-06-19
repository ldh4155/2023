package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.AuctionDto;
import com.ilgoojo.backend.dto.AuctionListDto;
import com.ilgoojo.backend.dto.BidDto;
import com.ilgoojo.backend.entity.Auction;
import com.ilgoojo.backend.service.AuctionService;
import com.ilgoojo.backend.service.FileStorageService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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
    public List<AuctionListDto> getAllAuctions() {
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
                                           @RequestParam("image") MultipartFile image,
                                 @RequestParam("endDate") LocalDateTime endDate) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuctionDto auctionDto = new AuctionDto(title,startPrice,endDate);
        return auctionService.createAuction(auctionDto,image,authentication.getName());
    }

    // 경매 입찰
    @PostMapping("auctions/{auctionId}/bid")
    public boolean bid(@PathVariable Integer auctionId, @RequestBody Integer amount) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        auctionService.checkAuctionsEnd();
        boolean checkFlag = auctionService.checkAuctionEnd(auctionId);
        if(checkFlag){
        auctionService.bid(auctionId, authentication.getName(),amount);
        }
        return checkFlag;
    }

    @PostMapping("auctions/{auctionId}/end")
    public boolean endAuction(@PathVariable Integer auctionId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return auctionService.endAuction(auctionId,authentication.getName());
    }

    @GetMapping("auctions/{auctionId}/check")
    public boolean checkAuction(@PathVariable Integer auctionId){
        return auctionService.checkAuctionEnd(auctionId);
    }

    @GetMapping("auctions/balance")
    public Integer getBalance(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return auctionService.getBalance(authentication.getName());
    }

    @GetMapping("auctions/{auctionId}/ownerId")
    public String getOwnerId(@PathVariable Integer auctionId){
        return auctionService.getOwnerId(auctionId);
    }
}