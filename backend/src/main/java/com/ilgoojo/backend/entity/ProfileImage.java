package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProfileImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_image_id")
    private Long id;
    private String profileImage="logo192.png";
}
