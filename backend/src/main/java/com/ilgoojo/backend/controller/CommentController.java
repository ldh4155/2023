package com.ilgoojo.backend.controller;
import com.ilgoojo.backend.dto.CommentRequestDto;
import com.ilgoojo.backend.dto.CommentResponseDto;
import com.ilgoojo.backend.dto.CommentWriteDto;
import com.ilgoojo.backend.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CommentController {

    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    //유저 id는 jwt 토큰에서 가져오기
    //댓글 쓰기
    @PostMapping("/board/{id}/comment")
    public CommentResponseDto writeComment(@PathVariable Integer id, @RequestBody CommentWriteDto commentWriteDto) {
        System.out.println("content:" +commentWriteDto.getContent());
        return commentService.writeComment(id, commentWriteDto, "123"); //유저id 임시 할당. 나중에 jwt에서 가져옴
    }

    @PutMapping("/board/{id}/comment")
    public CommentResponseDto updateComment(@PathVariable Integer id, @RequestBody CommentRequestDto commentRequestDto) {
        return commentService.updateComment(id, commentRequestDto);
    }

    @DeleteMapping("/board/{boardId}/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Integer boardId, @PathVariable Long commentId) {
        return new ResponseEntity<>(commentService.deleteComment(commentId), HttpStatus.ACCEPTED);
    }
}