package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.*;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
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

    @PostMapping("/findid") //아이디 찾기
    public ResponseEntity<String> findId(@RequestBody FindMemberDto findMemberDto) {
        String findId = memberService.findId(findMemberDto);

        if(findId != null)
            return new ResponseEntity<>(findId, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/findpwd") //임시 비밀번호 발급
    public ResponseEntity<?> findPwd(@RequestBody FindPwdDto findPwdDto) {
        if(memberService.findPwd(findPwdDto))
            return new ResponseEntity<>(true, HttpStatus.OK);
        else
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/changepwd")
    public ResponseEntity<?> changePwd(@RequestBody ChangePwd changePwd) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("비밀번호 변경 컨트롤러");
        if(memberService.changePwd(authentication.getName(), changePwd))
            return new ResponseEntity<>(true, HttpStatus.OK);
        else
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
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