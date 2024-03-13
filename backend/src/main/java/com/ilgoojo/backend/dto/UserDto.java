package com.ilgoojo.backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class UserDto {
    private String id;
    private String password;
    private String name;
    private String nickname;
    private String phone;
    private String address;
    private String email;
    private LocalDate birth;
    private Integer transactionCount;
    private String profileImage;
}
