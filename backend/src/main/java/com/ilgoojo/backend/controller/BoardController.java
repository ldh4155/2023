package com.ilgoojo.backend.controller;


import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/board")
    public ResponseEntity<?> save(@RequestBody Board board) {
        return new ResponseEntity<>(boardService.boardWrite(board), HttpStatus.OK);
    }
    @CrossOrigin()
   @GetMapping("/board")
    public ResponseEntity<?> findAll() {
       return new ResponseEntity<>(boardService.boardList(), HttpStatus.OK);
   }

    @GetMapping("/board/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        return new ResponseEntity<>(boardService.boardDetail(id), HttpStatus.OK);
    }

    @PutMapping("/board/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Board board) {
        return new ResponseEntity<>(boardService.boardModify(id, board), HttpStatus.OK);
    }

    @DeleteMapping("board/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id, @RequestBody Board board) {
        return new ResponseEntity<>(boardService.boardDelete(id), HttpStatus.OK);
    }
}
