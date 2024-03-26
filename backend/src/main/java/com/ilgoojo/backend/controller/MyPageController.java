package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.MemberDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.service.BoardService;
import com.ilgoojo.backend.service.FileStorageService;
import com.ilgoojo.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MyPageController {
    private final MemberService memberService;
    private final BoardService boardService;
    private final FileStorageService fileStorageService;

    @GetMapping("/mypageboard")
    public List<Board> getBoard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return boardService.findBoardsByWriter(authentication.getName());

    }

    @GetMapping("/mypageuser")
    public MemberDto getMyPageUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return memberService.getMemberById(authentication.getName());
    }

    @PutMapping("/mypageuser")
    public Member updateUser(@RequestBody Member newUserInfo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return memberService.updateUser(authentication.getName(), newUserInfo);
    }
    @DeleteMapping("/mypageuser")
    public ResponseEntity<?> deleteUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        memberService.deleteMember(authentication.getName());
        return ResponseEntity.ok().build();
    }
    @PostMapping("/mypageuser/upload")
    public String handleImageUpload(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return fileStorageService.storeFile(file, authentication.getName());
    }
    @GetMapping("/members")
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
}