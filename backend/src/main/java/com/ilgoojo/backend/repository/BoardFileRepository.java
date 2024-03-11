package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.BoardFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {
    @Query("SELECT bf.imageUrl FROM BoardFile bf WHERE bf.board.id = :boardId")
    List<String> findImageUrlsByBoardId(@Param("boardId") Integer boardId); //boardId로 파일 검색해서 url만 가져옴
}
