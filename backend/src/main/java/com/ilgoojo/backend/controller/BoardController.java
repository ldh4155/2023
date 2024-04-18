package com.ilgoojo.backend.controller;


import com.ilgoojo.backend.dto.BoardDetailDto;
import com.ilgoojo.backend.dto.BoardWriteDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import java.util.Optional;

@CrossOrigin
@RestController
public class BoardController {

    private final BoardService boardService;

    private final FileStorageService fileStorageService;

    @Autowired
    public BoardController(BoardService boardService, FileStorageService fileStorageService) {
        this.boardService = boardService;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/board") // 글 쓰기
    public ResponseEntity<?> save(@RequestPart(value = "files", required = false) List<MultipartFile> files,
                                  @RequestPart("title") String title,
                                  @RequestPart("content") String content) {
        // SecurityContextHolder에서 토큰값 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String writer = authentication.getName();
        BoardWriteDto boardWriteDto = BoardWriteDto.builder()
                .title(title)
                .content(content)
                .writer(writer)
                .build();

        Board board = boardService.boardWrite(boardWriteDto);

        boolean fileSaveError = false;

        if (files != null && !files.isEmpty()) {
            // 이미지와 비디오 파일을 함께 저장
            if (fileStorageService.storeBoardFile(files, board).isEmpty()) {
                fileSaveError = true;
            }
        }

        if (fileSaveError) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
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