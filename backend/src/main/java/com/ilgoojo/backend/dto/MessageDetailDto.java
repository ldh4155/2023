package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageDetailDto {

    private String sendMember;
    private String receiveMember;
    private String title;
    private String text;
    private String sendTime;
}
