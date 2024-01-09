package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Board extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String content;
    @Column(columnDefinition = "integer default 0", nullable = false)
    private int view;

}
