package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @GetMapping("/mypageboard/{id}")
    public List<Board> getBoard(@PathVariable("id") Integer writerId) {
        return boardRepository.findByWriter_MemberId(writerId);
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
}