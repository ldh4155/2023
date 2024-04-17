package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Board extends BaseTime {

    public Board() {
    }

    public Board(String title, String content, Member writer) {
        this.title = title;
        this.content = content;
        this.view = 0;
        this.writer = writer;

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String content;
    @Column(columnDefinition = "integer default 0", nullable = false)
    private Integer view;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member writer;
}