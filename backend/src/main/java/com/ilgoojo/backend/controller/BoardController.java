package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.service.BoardService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class BoardController {

    @Autowired
    private final BoardService boardService;
    @Autowired
    private final BoardRepository boardRepository;



    @PostMapping("/board")
    public ResponseEntity<?> createBoard(@RequestBody Board board, MultipartFile file) throws Exception {

        return new ResponseEntity<>(boardService.boardWrite(board, file), HttpStatus.CREATED);
    }

    @GetMapping("/board")
    public Page<Board> getBoards(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword) {
        return boardService.getBoards(page, size, keyword);
    }

    @GetMapping("/board/{id}") // 글 상세보기
    @Transactional
    public Board findById(@PathVariable Integer id) {
        Board board = boardRepository.findById(id).get();

        boardService.increaseView(id);

        return board;
    }

    @PutMapping("/board/{id}") // 글 수정하기
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Board board) throws Exception {
        return new ResponseEntity<>(boardService.boardModify(id, board), HttpStatus.OK);
    }

    @DeleteMapping("board/{id}") // 삭제하기
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return new ResponseEntity<>(boardService.boardDelete(id), HttpStatus.OK);
    }



}
