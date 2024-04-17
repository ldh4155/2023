package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuctionDto {
    private String bidder;
    private Integer amount;
}
