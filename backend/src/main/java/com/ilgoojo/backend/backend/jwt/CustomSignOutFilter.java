package com.ilgoojo.backend.jwt;

import com.ilgoojo.backend.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class CustomSignOutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public CustomSignOutFilter(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    @Transactional
    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        // 로그아웃 경로인지 확인
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("/signout")) {
            filterChain.doFilter(request, response);
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("로그아웃 필터 진입");

        // refresh token 가져오기
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) { // cookies가 null이 아닐 경우에만 for 루프 실행
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh"))
                    refresh = cookie.getValue();
            }
        }

        // refresh null check
        if (refresh == null) {
            response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED); //417
            return;
        }

        // 만료시간 체크
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST); //400
            return;
        }

        // 토큰이 refresh인지 확인
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            response.setStatus(HttpServletResponse.SC_CONFLICT); //409
            return;
        }

        // DB에 저장돼 있는지 확인
        Boolean isExist = refreshRepository.existsByRefresh(refresh);
        if (!isExist) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND); //404
            return;
        }

        // 로그아웃 진행
        // refresh token DB에서 제거
        refreshRepository.deleteByRefresh(refresh);

        // refresh token Cookie 값 0
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        System.out.println("refresh토큰 제거 완료");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}