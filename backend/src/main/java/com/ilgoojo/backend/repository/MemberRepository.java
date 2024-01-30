package com.ilgoojo.backend.repository;
import com.ilgoojo.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    public boolean existsById(String id);
}