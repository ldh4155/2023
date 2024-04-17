package com.ilgoojo.backend.dto;

import lombok.Getter;

@Getter
public class SendMessageDto {

    private String title;
    private String text;
    private String receiveMember;
}
