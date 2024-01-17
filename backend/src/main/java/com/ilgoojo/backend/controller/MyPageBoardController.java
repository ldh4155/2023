package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.MyPageBoard;
import com.ilgoojo.backend.repository.MyPageBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MyPageBoardController {

    private final MyPageBoardRepository myPageBoardRepository;

    @GetMapping("/mypageboard/{id}")
    public List<MyPageBoard> getMyPageBoard(@PathVariable("id") Integer writerId) {
        return myPageBoardRepository.findByWriterId(writerId);
    }
}
