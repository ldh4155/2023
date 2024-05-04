package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BidDto {
    private String bidder;
    private Integer amount;

    public BidDto(String bidder,Integer amount){
        this.bidder = bidder;
        this.amount = amount;
    }
}
