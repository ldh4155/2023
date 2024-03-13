package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "member")
public class Login {
    @Id
    private String id;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "birth")
    private LocalDate birth;

    @Column(name = "transactionCount", columnDefinition = "integer default 0", nullable = false)
    private Integer transactionCount;

    @Column(name = "profileImage")
    private String profileImage;
}
