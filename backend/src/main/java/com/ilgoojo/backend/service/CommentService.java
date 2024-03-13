package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.CommentRequestDto;
import com.ilgoojo.backend.dto.CommentResponseDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Comment;
import com.ilgoojo.backend.entity.Login;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.CommentRepository;
import com.ilgoojo.backend.repository.LoginRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final LoginRepository loginRepository;
    private final BoardRepository boardRepository;

    public CommentService(CommentRepository commentRepository, LoginRepository loginRepository,
                          BoardRepository boardRepository) {
        this.commentRepository = commentRepository;
        this.loginRepository = loginRepository;
        this.boardRepository = boardRepository;
    }

    public CommentResponseDto writeComment(Integer id, CommentRequestDto commentRequestDto, String userId) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new NoSuchElementException("게시물이 없음"));
        Login user = loginRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("사용자 없음"));

        Comment saveComment = Comment.builder()
                .content(commentRequestDto.getContent())
                .user(user)
                .board(board)
                .build();

        commentRepository.save(saveComment);

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return CommentResponseDto.builder()
                .nickname(user.getNickname())
                .content(saveComment.getContent())
                .createTime(saveComment.getCreateTime().format(dateTimeFormatter))
                .build();
    }

    public List<CommentResponseDto> showComments(Integer id) {
        List<Comment> comments = commentRepository.findByBoardId(id);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for(Comment comment : comments) {
            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .nickname(comment.getUser().getNickname())
                    .content(comment.getContent())
                    .createTime(comment.getCreateTime().format(dateTimeFormatter))
                    .build();

            commentResponseDtoList.add(commentResponseDto);
        }

        return commentResponseDtoList;
    }

}
