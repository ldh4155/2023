package com.ilgoojo.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Message {

    public Message() {
    }

    public Message(Member sendMember, Member receiveMember, String title, String text) {
        this.sendMember = sendMember;
        this.receiveMember = receiveMember;
        this.title = title;
        this.text = text;
        this.deleteByReceiver = false;
        this.deleteBySender = false;
        this.isRead = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member sendMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member receiveMember;

    @Column(nullable = false)
    private String title;
    private String text;
    private Boolean deleteBySender;
    private Boolean deleteByReceiver;
    private Boolean isRead;

    @CreatedDate
    private LocalDateTime createTime;

    //양 쪽 모두 삭제 요청 했으면 db에서도 삭제
    public boolean isDelete() {
        return deleteBySender && deleteByReceiver;
    }
}
