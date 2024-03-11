package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/signup")
    public ResponseEntity<Boolean> checkId(@RequestParam String id) {
        return ResponseEntity.ok(memberService.checkId(id));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Member member) {
        try {
            memberService.signUp(member);
            return new ResponseEntity<>("회원가입이 성공적으로 완료되었습니다.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("회원가입 중 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/memberStructure")
    public Map<String, String> getMemberStructure() {
        Map<String, String> structure = new HashMap<>();
        Field[] fields = Member.class.getDeclaredFields();
        for (Field field : fields) {
            structure.put(field.getName(), field.getType().getSimpleName());
        }
        return structure;
    }
}
