package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.Token;
import com.ilgoojo.backend.entity.RefreshToken;
import com.ilgoojo.backend.jwt.JWTUtil;
import com.ilgoojo.backend.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class JWTService {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public JWTService(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Transactional
    public Token reissue (HttpServletRequest request, HttpServletResponse response) {
        System.out.println("재발급 서비스 진입");
        String refresh = null;

        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh"))
                    refresh = cookie.getValue();
            }
        }

        if(refresh == null)
            return null;

        //만료 체크
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            return null;
        }

        //토큰이 refresh인지 확인
        String category = jwtUtil.getCategory(refresh);

        if(!category.equals("refresh"))
            return null;

        //db에 저장돼 있는지 확인
        Boolean isExist = refreshRepository.existsByRefresh(refresh);
        if(!isExist)
            return null;

        String username = jwtUtil.getUsername(refresh);

        //JWT 재발급
        String newAccess = jwtUtil.createJwt("access",username,6000000L);
        String newRefresh = jwtUtil.createJwt("refresh",username,86400000L);

        //기존 refresh 토큰 db에서 삭제 후 새 refresh 토큰 저장
        refreshRepository.deleteByRefresh(refresh);
        System.out.println("기존 refresh 삭제 성공");
        addRefreshToken(username,newRefresh,86400000L);
        System.out.println("access, refresh 재발급 성공");

        return Token.builder()
                .accessToken(newAccess)
                .refreshToken(newRefresh)
                .build();
    }

    private void addRefreshToken(String username, String refresh, Long expiredMs) {
        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUsername(username);
        refreshToken.setRefresh(refresh);
        refreshToken.setExpiration(date.toString());

        refreshRepository.save(refreshToken);
    }

}