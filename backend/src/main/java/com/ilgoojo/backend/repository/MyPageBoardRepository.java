package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.MyPageBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MyPageBoardRepository extends JpaRepository<MyPageBoard, Integer> {
    List<MyPageBoard> findByWriterId(Integer writerId);
}
