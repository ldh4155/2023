package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, String> {
    // 사용자 ID로 Login 정보를 찾는 메소드
    public boolean existsById(String userId);

    // 사용자 정보를 저장하는 메소드는 JpaRepository 인터페이스에 이미 구현되어 있으므로 별도로 추가하지 않았습니다.
    // Login save(Login user);
}
