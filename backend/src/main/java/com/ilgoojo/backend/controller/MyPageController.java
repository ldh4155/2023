package com.ilgoojo.backend.controller;

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
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final FileStorageService fileStorageService;

    @GetMapping("/mypageboard/{id}")
    public List<Board> getBoard(@PathVariable("id") String writerId) {
        return boardRepository.findByWriter_Id(writerId);
    }

    @GetMapping("/mypageuser/{id}")
    public Member getMyPageUser(@PathVariable String id) {
        return memberRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }

    @PutMapping("/mypageuser/{id}")
    public Member updateUser(@PathVariable String id, @RequestBody Member newUserInfo) {
        return memberRepository.findById(id).map(user -> {
            if (newUserInfo.getNickName() != null) {
                user.setNickName(newUserInfo.getNickName());
            }
            if (newUserInfo.getName() != null) {
                user.setName(newUserInfo.getName());
            }
            if (newUserInfo.getPhoneNumber() != null) {
                user.setPhoneNumber(newUserInfo.getPhoneNumber());
            }
            if (newUserInfo.getAddress() != null) {
                user.setAddress(newUserInfo.getAddress());
            }
            if (newUserInfo.getEmail() != null) {
                user.setEmail(newUserInfo.getEmail());
            }
            if (newUserInfo.getBirth() != null) {
                user.setBirth(newUserInfo.getBirth());
            }
            if (newUserInfo.getPassword() != null) {
                user.setPassword(newUserInfo.getPassword());
            }
            // 추가적으로 수정하려는 필드가 있다면 위와 같은 방식으로 체크하고 설정하세요.
            return memberRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
    @DeleteMapping("/mypageuser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/mypageuser/{id}/upload")
    public String handleImageUpload(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id " + id));
        member.setProfileImage(fileName);
        memberRepository.save(member);

        return fileName;
    }
    @GetMapping("/members")
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
}