package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

}
