package com.ilgoojo.backend.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilgoojo.backend.dto.SignInDto;
import com.ilgoojo.backend.entity.RefreshToken;
import com.ilgoojo.backend.repository.RefreshRepository;
import com.ilgoojo.backend.util.JwtRelatedUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class SignInFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    private RefreshRepository refreshRepository;

    public SignInFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("signin filter");
        SignInDto signInDto;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            signInDto = objectMapper.readValue(messageBody, SignInDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String memberId = signInDto.getId();
        String password = signInDto.getPassword();

        System.out.println("memberId = " + memberId);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(memberId, password);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        //유저 정보
        String username = authentication.getName();

        //토큰 생성
        String access = jwtUtil.createJwt("access",username,600000L);
        String refresh = jwtUtil.createJwt("refresh",username,86400000L);

        //refresh 토큰 저장
        addRefreshToken(username,refresh,86400000L);

        //응답 설정
        response.setHeader("access",access);
        response.addCookie(JwtRelatedUtil.createCookie("refresh",refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
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
