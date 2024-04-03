package com.ilgoojo.backend.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Auction{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auctionId;
    @OneToOne
    @JoinColumn(name = "member_id")
    private Member bidder;
    private int amount;
}