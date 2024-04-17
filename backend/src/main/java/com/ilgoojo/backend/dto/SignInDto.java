package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInDto {

    private String memberId;
    private String password;
}
