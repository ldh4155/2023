package com.ilgoojo.backend.controller;
import com.ilgoojo.backend.entity.MyPageUser;
import com.ilgoojo.backend.repository.MyPageUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class MyPageController {
    @Autowired
    private MyPageUserRepository myPageUserRepository;

    @GetMapping("/mypageuser/{id}")
    public MyPageUser getUser(@PathVariable Integer id) {
        return myPageUserRepository.findById(id).orElse(null);
    }

}
