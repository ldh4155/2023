package com.ilgoojo.backend.controller;


import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.service.BoardService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class BoardController {
    @Autowired
    private final BoardService boardService;

    @PostMapping("/board") // 글 쓰기
    public ResponseEntity<?> save(@RequestBody Board board) {
        return new ResponseEntity<>(boardService.boardWrite(board), HttpStatus.CREATED);
    }

    @GetMapping("/board")
    public Page<Board> getBoards(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword) {
        return boardService.getBoards(page, size, keyword);
    }

    @GetMapping("/board/{id}")
    @Transactional
    public Board findById(@PathVariable Integer id) {
        return boardService.getBoardById(id);
    }

    @PutMapping("/board/{id}") // 글 수정하기
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Board board) {
        return new ResponseEntity<>(boardService.boardModify(id, board), HttpStatus.OK);
    }

    @DeleteMapping("board/{id}") // 삭제하기
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return new ResponseEntity<>(boardService.boardDelete(id), HttpStatus.OK);
    }
    @PostMapping("/board/{id}/views")
    @Transactional
    public void increaseView(@PathVariable Integer id) {
        boardService.increaseView(id);
    }
}