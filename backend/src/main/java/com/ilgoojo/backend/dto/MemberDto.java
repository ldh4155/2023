package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDto {
    private String id;
    private String nickName;
    private String name;
    private String email;
    private String address;
    private String phone;
    private String birth;
    private Integer numberOfTransactions;
    private String imageUrl;
}
