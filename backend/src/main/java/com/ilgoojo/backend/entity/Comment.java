package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    public Comment() {
    }

    @Builder
    public Comment(Long id, String content, Login user, Board board, LocalDateTime createTime) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.board = board;
        this.createTime = createTime;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY) //지연로딩
    @JoinColumn(name = "user_id")
    private Login user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @CreatedDate
    private LocalDateTime createTime;
}
