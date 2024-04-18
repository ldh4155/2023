package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    @Query("SELECT b FROM Board b WHERE b.title LIKE %:keyword% OR b.content LIKE %:keyword% ORDER BY createTime DESC")
    Page<Board> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    List<Board> findByWriter_Id(String writerId);
}