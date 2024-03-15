package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.MemberDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.service.FileStorageService;
import com.ilgoojo.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MyPageController {
    private final MemberService memberService;
    private final BoardRepository boardService;
    private final FileStorageService fileStorageService;

    @GetMapping("/mypageboard/{id}")
    public List<Board> getBoard(@PathVariable("id") String writerId) {

        return boardService.findByWriter_Id(writerId);

    }

    @GetMapping("/mypageuser/{id}")
    public MemberDto getMyPageUser(@PathVariable String id) {
        return memberService.getMemberById(id);
    }

    @PutMapping("/mypageuser/{id}")
    public Member updateUser(@PathVariable String id, @RequestBody Member newUserInfo) {
        return memberService.updateUser(id, newUserInfo);
    }
    @DeleteMapping("/mypageuser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/mypageuser/{id}/upload")
    public String handleImageUpload(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        return fileStorageService.storeFile(file, id);
    }
    @GetMapping("/members")
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
}