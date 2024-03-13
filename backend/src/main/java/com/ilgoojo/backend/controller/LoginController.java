package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.UserDto;
import com.ilgoojo.backend.entity.Login;
import com.ilgoojo.backend.service.LoginService;
import com.ilgoojo.backend.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.Optional;

@CrossOrigin
@RestController
public class   LoginController {

    private LoginService loginService;
    private LoginRepository loginRepository;

    @Autowired
    public LoginController(LoginService loginService, LoginRepository loginRepository) {
        this.loginService = loginService;
        this.loginRepository = loginRepository;
    }



    @PostMapping("/signin")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) {
        if (userDto.getId() == null) {
            return new ResponseEntity<>("아이디를 입력해주세요!", HttpStatus.BAD_REQUEST);
        }

        // id에 해당하는 사용자를 찾습니다.
        Optional<Login> user = loginRepository.findById(userDto.getId());

        if (user.isPresent()) {
            // 이미 같은 아이디를 가진 사용자가 존재합니다.
            return new ResponseEntity<>("이미 존재하는 아이디 입니다!", HttpStatus.BAD_REQUEST);
        } else {
            // 같은 아이디를 가진 사용자가 존재하지 않으므로, 회원가입을 진행합니다.
            Login login = new Login();
            login.setId(userDto.getId());
            login.setPassword(userDto.getPassword());
            login.setName(userDto.getName());
            login.setNickname(userDto.getNickname());
            login.setPhone(userDto.getPhone());
            login.setAddress(userDto.getAddress());
            login.setEmail(userDto.getEmail());
            login.setBirth(userDto.getBirth());
            login.setTransactionCount(userDto.getTransactionCount() == null ? 0 : userDto.getTransactionCount());
            login.setProfileImage(userDto.getProfileImage());

            loginRepository.save(login);
            return new ResponseEntity<>("회원가입이 완료되었습니다!", HttpStatus.OK);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        if (userDto.getId() == null) {
            // 아이디 입력 안 됨
            return new ResponseEntity<>(Collections.singletonMap("message", "아이디를 입력해주세요!"), HttpStatus.BAD_REQUEST);
        }

        // id에 해당하는 사용자를 찾습니다.
        Optional<Login> user = loginRepository.findById(userDto.getId());

        if (user.isPresent()) {
            // 비밀번호 확인
            if (user.get().getPassword().equals(userDto.getPassword())) {
                // 로그인 성공
                return new ResponseEntity<>(Collections.singletonMap("message", "로그인에 성공하였습니다!"), HttpStatus.OK);
            } else {
                // 비밀번호 불일치
                return new ResponseEntity<>(Collections.singletonMap("message", "비밀번호가 틀렸습니다!"), HttpStatus.BAD_REQUEST);
            }
        } else {
            // 아이디 불일치
            return new ResponseEntity<>(Collections.singletonMap("message", "아이디가 틀렸습니다!"), HttpStatus.BAD_REQUEST);
        }
    }

}
