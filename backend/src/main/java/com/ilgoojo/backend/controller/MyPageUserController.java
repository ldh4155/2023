package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.MyPageUser;
import com.ilgoojo.backend.repository.MyPageUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MyPageUserController {

    private final MyPageUserRepository myPageUserRepository;

    @GetMapping("/mypageuser/{id}")
    public MyPageUser getMyPageUser(@PathVariable Integer id) {
        return myPageUserRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
}
