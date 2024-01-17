package com.ilgoojo.backend.repository;
import com.ilgoojo.backend.entity.MyPageUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyPageUserRepository extends JpaRepository<MyPageUser, String> {
}