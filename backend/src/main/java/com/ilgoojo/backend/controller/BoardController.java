package com.ilgoojo.backend.controller;


import com.ilgoojo.backend.dto.BoardDetailDto;
import com.ilgoojo.backend.dto.BoardWriteDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.service.BoardService;
import com.ilgoojo.backend.service.FileStorageService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
public class BoardController {

    @Autowired
    private final BoardService boardService;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private final FileStorageService fileStorageService;

    @Autowired
    public BoardController(BoardService boardService, FileStorageService fileStorageService) {
        this.boardService = boardService;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/board") // 글 쓰기
    public ResponseEntity<?> save(@RequestPart(value = "images", required = false) List<MultipartFile> imageFiles,
                                  @RequestPart("title")String title, @RequestPart("content")String content) {

        BoardWriteDto boardWriteDto = BoardWriteDto.builder()
                .title(title)
                .content(content)
                .build();

        Board boardId = boardService.boardWrite(boardWriteDto);

        if(imageFiles != null && !imageFiles.isEmpty()) {
            if(fileStorageService.storeBoardFile(imageFiles, boardId) == null) {
                return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(true, HttpStatus.CREATED);
    }

    @GetMapping("/board")
    public Page<Board> getBoards(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword) {
        return boardService.getBoards(page, size, keyword);
    }

    @GetMapping("/board/{id}") // 글 상세보기
    public ResponseEntity<BoardDetailDto> getBoardDetail(@PathVariable Integer id) {
        Board board = boardRepository.findById(id).get();

        boardService.increaseView(id);
        BoardDetailDto boardDetailDto = boardService.getBoardDetail(id);
        boardDetailDto.setImageUrls(fileStorageService.getImageUrls(id));

        return new ResponseEntity<>(boardDetailDto, HttpStatus.OK);
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