package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.BoardDetailDto;
import com.ilgoojo.backend.dto.BoardWriteDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.service.BoardService;
import com.ilgoojo.backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
public class BoardController {

    private final BoardService boardService;
    private final FileStorageService fileStorageService;
    private final MemberRepository memberRepository;

    @Autowired
    public BoardController(BoardService boardService, FileStorageService fileStorageService, MemberRepository memberRepository) {
        this.boardService = boardService;
        this.fileStorageService = fileStorageService;
        this.memberRepository = memberRepository;
    }

    @PostMapping("/board") // 글 쓰기
    public ResponseEntity<?> save(@RequestPart(value = "files", required = false) List<MultipartFile> files,
                                  @RequestPart("title") String title,
                                  @RequestPart("content") String content,
                                  @RequestPart("category") String category) { // 카테고리 추가
        // SecurityContextHolder에서 토큰값 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String writer = authentication.getName();

        Member member = memberRepository.findById(writer)
                .orElseThrow(() -> new NoSuchElementException("사용자 아이디 오류"));

        BoardWriteDto boardWriteDto = BoardWriteDto.builder()
                .title(title)
                .content(content)
                .writer(writer)
                .address(member.getAddress()) // 주소 추가
                .category(category) // 카테고리 설정
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

    @GetMapping("/board/top")
    public Page<Board> getTopBoards(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        return boardService.getBoardsByView(page, size);
    }

    @GetMapping("/board/{id}") // 글 상세보기
    public ResponseEntity<BoardDetailDto> getBoardDetail(@PathVariable Integer id) {
        BoardDetailDto boardDetailDto = boardService.getBoardDetail(id);
        boardDetailDto.setImageUrls(fileStorageService.getImageUrls(id));
        boardDetailDto.setOriginalFileName((fileStorageService.getOriginFileNames(id)));

        return new ResponseEntity<>(boardDetailDto, HttpStatus.OK);
    }

    @PutMapping("/board/{id}")
    @Transactional // 트랜잭션 관리 추가
    public ResponseEntity<?> update(@PathVariable Integer id,
                                    @RequestPart("title") String title,
                                    @RequestPart("content") String content,
                                    @RequestPart("category") String category, // 카테고리 추가
                                    @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        // 게시글 존재 여부 확인
        Board existingBoard = boardService.getBoardById(id);
        if (existingBoard == null) {
            return ResponseEntity.notFound().build();
        }

        // 게시글 정보 업데이트
        existingBoard.setTitle(title);
        existingBoard.setContent(content);
        existingBoard.setCategory(category); // 카테고리 업데이트

        // 게시글 업데이트
        Board updatedBoard = boardService.boardModify(id, existingBoard);

        // 기존 파일 삭제 및 새 파일 저장 로직
        if (files != null && !files.isEmpty()) {
            // 기존 파일 삭제
            fileStorageService.deleteImage(id);

            // 새 파일 저장
            if (fileStorageService.storeBoardFile(files, updatedBoard).isEmpty()) {
                // 파일 저장에 실패한 경우
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 저장에 실패했습니다.");
            }
        }

        return ResponseEntity.ok("게시글이 성공적으로 업데이트되었습니다.");
    }

    @DeleteMapping("/board/{id}") // 삭제하기
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return new ResponseEntity<>(boardService.boardDelete(id), HttpStatus.OK);
    }

    @GetMapping("/board/filter")
    public ResponseEntity<List<Board>> filterBoards(@RequestParam(required = false) List<String> cities, @RequestParam(required = false) String category) {
        List<Board> filteredBoards;
        if ((cities == null || cities.isEmpty()) && (category != null && !category.isEmpty())) {
            filteredBoards = boardService.getBoardsByCategory(category);
        } else if (cities != null && !cities.isEmpty() && (category == null || category.isEmpty())) {
            filteredBoards = boardService.getBoardsByCities(cities);
        } else if (cities != null && !cities.isEmpty() && (category != null && !category.isEmpty())) {
            filteredBoards = boardService.getBoardsByCitiesAndCategory(cities, category);
        } else {
            filteredBoards = boardService.boardList(); // 기본 전체 게시물 가져오기
        }
        return new ResponseEntity<>(filteredBoards, HttpStatus.OK);
    }
}