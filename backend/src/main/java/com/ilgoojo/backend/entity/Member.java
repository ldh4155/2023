package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Member {
    @Id
    private String id;

    private String password;
    private String name;

    @Column(name = "nick_name")
    private String nickName;

    @Column(name = "phone_number")
    private String phoneNumber;
    private String address;
    private String email;
    private LocalDate birth;

    @Column(name = "number_of_transactions", columnDefinition = "integer default 0", nullable = false)
    private Integer numberOfTransactions;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_image")
    private ProfileImage profileImage;
}

