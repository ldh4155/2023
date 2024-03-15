package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SignUpDto {
    private String id;
    private String password;
    private String name;
    private String nickName;
    private String phone;
    private String address;
    private String email;
    private String birth;
}
