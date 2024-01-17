package com.ilgoojo.backend.entity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
public class MyPageUser {
    @Id
    private Integer id;
    private String image;
    private String name;
    private String nickname;
    private String phone_number;
    private String address;
    private String manner_temperature;

    // getter, setter...
}