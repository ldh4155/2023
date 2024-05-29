package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.CommentRequestDto;
import com.ilgoojo.backend.dto.CommentResponseDto;
import com.ilgoojo.backend.dto.CommentWriteDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Comment;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.CommentRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.util.DateUtil;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public CommentService(CommentRepository commentRepository, MemberRepository memberRepository,
                          BoardRepository boardRepository) {
        this.commentRepository = commentRepository;
        this.memberRepository = memberRepository;
        this.boardRepository = boardRepository;
    }

    public CommentResponseDto writeComment(Integer id, CommentWriteDto commentWriteDto, String memberId) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new NoSuchElementException("게시물이 없음"));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("사용자 없음"));

        Comment comment = new Comment(commentWriteDto.getContent(), member, board);

        Comment saveComment = commentRepository.save(comment);

        return CommentResponseDto.builder()
                .id(saveComment.getId())
                .memberNickName(member.getNickName())
                .content(saveComment.getContent())
                .createTime(DateUtil.FormatDate(saveComment.getCreateTime()))
                .build();
    }

    public List<CommentResponseDto> showComments(Integer id) {
        List<Comment> comments = commentRepository.findByBoardId(id);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();

        for(Comment comment : comments) {
            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .id(comment.getId())
                    .memberId(comment.getMember().getId())
                    .memberNickName(comment.getMember().getNickName())
                    .content(comment.getContent())
                    .createTime(DateUtil.FormatDate(comment.getCreateTime()))
                    .build();

            commentResponseDtoList.add(commentResponseDto);
        }
        return commentResponseDtoList;
    }

    public CommentResponseDto updateComment(Integer id, CommentRequestDto commentRequestDto) {
        Comment comment = commentRepository.findByBoardIdAndId(id, commentRequestDto.getId());

        comment.update(commentRequestDto.getContent());
        commentRepository.save(comment);
        return CommentResponseDto.builder()
                .id(comment.getId())
                .memberNickName(comment.getMember().getNickName())
                .content(comment.getContent())
                .createTime(DateUtil.FormatDate(comment.getCreateTime()))
                .build();
    }

    public boolean deleteComment(Long commentId) {
        try {
            commentRepository.deleteById(commentId);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

}

