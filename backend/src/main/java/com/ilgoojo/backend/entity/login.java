package com.ilgoojo.backend.entity;

import jakarta.persistence.*;

import javax.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String nickname;
    private String phone;
    private String address;
    private String birth;
    private int transactionCount;
    private String profileImage;


}
