package com.ilgoojo.backend.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Auction{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer auctionId;
    private String title;
    private Integer startPrice;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_image")
    private ProfileImage auctionImageId;
    @ManyToOne
    @JoinColumn(name = "bidder_id")
    private Member bidder;
    private Integer amount;
    private boolean activation = true;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Member owner;
    private LocalDateTime endDate;

    public Auction(){}
    public Auction(String title,Integer startPrice,ProfileImage profileImage, Member bidder, Integer amount,boolean activation,Member owner){
        this.title = title;
        this.startPrice = startPrice;
        this.auctionImageId = profileImage;
        this.bidder = bidder;
        this.amount = amount;
        this.activation = activation;
        this.owner = owner;
    }

    public boolean getActivation() {
        return this.activation;
    }
}