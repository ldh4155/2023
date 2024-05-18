package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProfileImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_image_id")
    private Long prifileImageId;

    @Column(name = "profile_image")
    private String profileImage="panda.jpg";
    private String url;
}
