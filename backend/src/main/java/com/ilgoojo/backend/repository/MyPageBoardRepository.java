package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.MyPageBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyPageBoardRepository extends JpaRepository<MyPageBoard, Integer> {
    List<MyPageBoard> findByWriter_Id(Integer writerId);
}
