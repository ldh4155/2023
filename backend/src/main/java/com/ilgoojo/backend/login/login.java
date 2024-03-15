package com.ilgoojo.backend.login;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*") // 모든 도메인에서의 접근을 허용합니다.
@RequestMapping("/api")
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // 로그인 처리 로직
        // 예시로는 아이디와 비밀번호 확인 후 토큰을 생성하여 반환하는 코드를 작성하였습니다.
        if (loginRequest.getUserId().equals("test") && loginRequest.getUserPassword().equals("password")) {
            String token = "generated-token";
            return ResponseEntity.ok(new LoginResponse("True", token));
        } else {
            return ResponseEntity.ok(new LoginResponse("False", null));
        }
    }

    // LoginRequest 클래스
    public static class LoginRequest {
        private String userId;
        private String userPassword;

        // getter, setter
    }

    // LoginResponse 클래스
    public static class LoginResponse {
        private String isLogin;
        private String token;

        // getter, setter
    }
}
