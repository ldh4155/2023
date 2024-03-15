package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Member {

    public Member() {
    }

    public Member(String id, String password, String name, String nickName, String phoneNumber,
                  String address, String email, String birth, ProfileImage profileImage) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.nickName = nickName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
        this.birth = birth;
        this.numberOfTransactions = 0;
        this.profileImage = profileImage;
    }

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
    private String birth;

    @Column(name = "number_of_transactions", columnDefinition = "integer default 0", nullable = false)
    private Integer numberOfTransactions;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_image")
    private ProfileImage profileImage;
}

