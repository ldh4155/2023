package com.ilgoojo.backend.dto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class AuctionDto {
    private String title;
    private Integer startPrice;
    private LocalDateTime endDate;

    public AuctionDto(String title, Integer startPrice, LocalDateTime endDate){
        this.title = title;
        this.startPrice = startPrice;
        this.endDate = endDate;
    }
}