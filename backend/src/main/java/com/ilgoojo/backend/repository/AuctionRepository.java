package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.dto.AuctionDto;
import com.ilgoojo.backend.dto.AuctionListDto;
import com.ilgoojo.backend.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Integer> {

    @Query("SELECT new com.ilgoojo.backend.dto.AuctionListDto(a.auctionId, a.title, a.startPrice, a.amount, COALESCE(p.profileImage, '')) " +
            "FROM Auction a " +
            "LEFT JOIN a.auctionImageId p " +
            "WHERE a.activation = true")
    List<AuctionListDto> findAuctionsAsDto();

    @Query("SELECT new com.ilgoojo.backend.dto.AuctionListDto(a.auctionId,a.title, a.startPrice,a.amount, COALESCE(p.profileImage, '')) " +
            "FROM Auction a " +
            "LEFT JOIN a.auctionImageId p " +
            "WHERE a.owner.memberId = :ownerId AND a.activation = true")
    List<AuctionListDto> findByOwner(String ownerId);

    List<Auction> findByActivationTrueAndEndDateBefore(LocalDateTime now);
}
