package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.User;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @GetMapping("/mypageboard/{id}")
    public List<Board> getBoard(@PathVariable("id") Integer writerId) {
        return boardRepository.findByWriter_UserId(writerId);
    }

    @GetMapping("/mypageuser/{id}")
    public User getMyPageUser(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }

    @PutMapping("/mypageuser/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User newUserInfo) {
        return userRepository.findById(id).map(user -> {
            if (newUserInfo.getNickname() != null) {
                user.setNickname(newUserInfo.getNickname());
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
            // 추가적으로 수정하려는 필드가 있다면 위와 같은 방식으로 체크하고 설정하세요.
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
}
