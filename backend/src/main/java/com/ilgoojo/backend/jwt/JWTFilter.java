package com.ilgoojo.backend.jwt;

import com.ilgoojo.backend.dto.MemberDetails;
import com.ilgoojo.backend.entity.Member;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //request Authorization 헤더 찾음
        String authorization = request.getHeader("Authorization");

        //Authorization 헤더 검증
        if(authorization == null || !authorization.startsWith("Bearer ")) {
            System.out.println("token null");
            filterChain.doFilter(request, response);

            return;
        }

        String token = authorization.split(" ")[1];

        //토큰 소멸시간 검증
        if(jwtUtil.isExpired(token)) {
            System.out.println("토큰 소멸");
            filterChain.doFilter(request, response);

            return;
        }

        String memberId = jwtUtil.getMemberId(token);
        System.out.println("JWT Filter memberId = " + memberId);

        Member member = new Member();
        member.setMemberId(memberId);
        MemberDetails memberDetails = new MemberDetails(member);

        Authentication authToken =
                new UsernamePasswordAuthenticationToken(memberDetails, null, memberDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);

    }
}
