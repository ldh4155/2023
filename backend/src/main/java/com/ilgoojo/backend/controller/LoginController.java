package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;

@CrossOrigin
@RestController
public class LoginController {
    private final MemberService memberService;

    @Autowired
    public LoginController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, Object> params) {
        String id = (String) params.get("id");
        String password = (String) params.get("password");

        try {
            String token = memberService.login(id, password);
            if (token != null) {
                return token;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
}