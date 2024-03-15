package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardId(Integer id);
    Comment findByBoardIdAndId(Integer boardId, Long commentId);
}