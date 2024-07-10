package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.Token;
import com.ilgoojo.backend.service.JWTService;
import com.ilgoojo.backend.util.JwtRelatedUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ReissueController {

    private final JWTService jwtService;

    public ReissueController(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        Token newToken = jwtService.reissue(request,response);
        if(newToken == null)
            return new ResponseEntity<>("refresh token error",HttpStatus.BAD_REQUEST);
        else {
            response.setHeader("access", newToken.getAccessToken());
            response.addCookie(JwtRelatedUtil.createCookie("refresh", newToken.getRefreshToken()));

            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}