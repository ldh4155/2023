package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProfileImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "profile_image")
    private String profileImage = "logo192.png";
}
