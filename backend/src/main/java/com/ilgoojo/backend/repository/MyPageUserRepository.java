package com.ilgoojo.backend.repository;
import com.ilgoojo.backend.entity.MyPageUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyPageUserRepository extends JpaRepository<MyPageUser, Integer> {
}