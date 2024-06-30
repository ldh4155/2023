package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.BoardFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {
    @Query("SELECT bf.imageUrl FROM BoardFile bf WHERE bf.board.id = :boardId")
    List<String> findImageUrlsByBoardId(@Param("boardId") Integer boardId); //boardId로 파일 검색해서 url만 가져옴

    @Query("SELECT bf.storedFileName FROM BoardFile bf WHERE bf.board.id = :boardId")
    List<String> findStoredFileNameByBoardId(@Param("boardId")Integer BoardId);

    @Query("SELECT bf.originalFileName FROM BoardFile bf WHERE bf.board.id = :boardId")
    List<String> findOriginalFileNameByBoardId(@Param("boardId")Integer BoardId);

    BoardFile findByStoredFileName(String storedFileName);
}


