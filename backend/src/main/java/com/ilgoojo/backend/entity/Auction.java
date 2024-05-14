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
    private Integer auctionId;
    private String title;
    private Integer startPrice;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_image")
    private ProfileImage auctionImageId;
    @OneToOne
    @JoinColumn(name = "member_id")
    private Member bidder;
    private Integer amount;
    private boolean activation;

    public Auction(){}
    public Auction(String title,Integer startPrice,ProfileImage profileImage, Member bidder, Integer amount){
        this.title = title;
        this.startPrice = startPrice;
        this.auctionImageId = profileImage;
        this.bidder = bidder;
        this.amount = amount;
        this.activation = true;
    }
}