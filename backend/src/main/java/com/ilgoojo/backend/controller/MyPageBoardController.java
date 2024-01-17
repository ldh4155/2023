package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.MyPageBoard;
import com.ilgoojo.backend.repository.MyPageBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyPageBoardController {
    @Autowired
    private MyPageBoardRepository myPageBoardRepository;
    @GetMapping("/mypageboard/{id}")
    public List<MyPageBoard> getMyPageBoard(@PathVariable Integer writerId){
        return myPageBoardRepository.findByWriter_Id(writerId);
    }
}
