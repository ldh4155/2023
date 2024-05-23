package com.ilgoojo.backend.dto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuctionDto {
    private String title;
    private Integer startPrice;

    public AuctionDto(String title, Integer startPrice){
        this.title = title;
        this.startPrice = startPrice;
    }
}
