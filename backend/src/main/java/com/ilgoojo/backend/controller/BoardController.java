package com.ilgoojo.backend.controller;


import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/board") // 글 쓰기
    public ResponseEntity<?> save(@RequestBody Board board) {
        return new ResponseEntity<>(boardService.boardWrite(board), HttpStatus.CREATED);
    }

   @GetMapping("/board") // 글 불러오기
    public ResponseEntity<?> findAll() {
       return new ResponseEntity<>(boardService.boardList(), HttpStatus.OK);
   }

    @GetMapping("/board/{id}") // 글 상세보기
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        return new ResponseEntity<>(boardService.boardDetail(id), HttpStatus.OK);
    }

    @PutMapping("/board/{id}") // 글 수정하기
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Board board) {
        return new ResponseEntity<>(boardService.boardModify(id, board), HttpStatus.OK);
    }

    @DeleteMapping("board/{id}") // 삭제하기
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return new ResponseEntity<>(boardService.boardDelete(id), HttpStatus.OK);
    }

}
