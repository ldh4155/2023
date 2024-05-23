package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
    boolean existsById(String id);
    Member findByNickName(String nickName);
}