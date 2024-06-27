package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardWriteDto {

    private String title;
    private String content;
    private String writer;
    private String address;
    private String category;
}