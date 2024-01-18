package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.MyPageUser;
import com.ilgoojo.backend.repository.MyPageUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MyPageUserController {

    private final MyPageUserRepository myPageUserRepository;

    @GetMapping("/mypageuser/{id}")
    public MyPageUser getMyPageUser(@PathVariable Integer id) {
        return myPageUserRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }

    @PutMapping("/mypageuser/{id}")
    public MyPageUser updateMyPageUser(@PathVariable Integer id, @RequestBody MyPageUser newUserInfo) {
        return myPageUserRepository.findById(id).map(user -> {
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
            return myPageUserRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
}
