package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Board extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String filename;
    private String filepath;


    @Column(columnDefinition = "integer default 0", nullable = false)
    private int view;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


}


