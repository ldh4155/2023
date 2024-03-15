package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.SignInDto;
import com.ilgoojo.backend.dto.SignUpDto;
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

    @GetMapping("/signup") //아이디 중복 체크
    public ResponseEntity<Boolean> checkId(@RequestParam String id) {
        return ResponseEntity.ok(memberService.checkId(id));
    }

    @PostMapping("/signup") //회원가입
    public ResponseEntity<Boolean> signUp(@RequestBody SignUpDto signUpDto) {
        if(memberService.signUp(signUpDto))
            return new ResponseEntity<>(true,HttpStatus.CREATED);
        else
            return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/signin") //로그인
    public ResponseEntity<?> signIn(@RequestBody SignInDto signInDto) {
        if(signInDto.getId() != null && signInDto.getPassword() != null)
            return new ResponseEntity<>(memberService.signIn(signInDto), HttpStatus.ACCEPTED);
        else
            return  new ResponseEntity<>("아이디나 비밀번호 입력", HttpStatus.BAD_REQUEST);
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