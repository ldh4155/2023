package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySendMemberId(String sendId);
    List<Message> findByReceiveMemberId(String receiveId);
}
