package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuctionListDto {
    private Integer auctionId;
    private String title;
    private Integer startPrice;
    private Integer amount;
    private String imageUrl;
}
