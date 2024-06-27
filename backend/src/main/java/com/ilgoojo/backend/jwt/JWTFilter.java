package com.ilgoojo.backend.jwt;

import com.ilgoojo.backend.dto.MemberDetails;
import com.ilgoojo.backend.entity.Member;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if("/login".equals(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }
        //헤더에서 access키에 담긴 토큰 꺼내기
        String accessToken = request.getHeader("access");

        //없으면 다음 필터로
        if(accessToken == null) {
            filterChain.doFilter(request,response);
            return;
        }

        //토큰 만료 여부 확인함, 만료시 다음 필터로 넘기지 않음
        try {
            jwtUtil.isExpired(accessToken);
        } catch(ExpiredJwtException e) {
            System.out.println("토큰 만료됨(401)");

            //response body
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");

            //response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); //상태코드는 프론트와 합의
            return;
        }

        //토큰이 access인지 확인
        String category = jwtUtil.getCategory(accessToken);

        if(!category.equals("access")) {

            //response body
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");

            //response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        //username값 획득
        String username = jwtUtil.getUsername(accessToken);

        Member member = new Member();
        member.setId(username);
        MemberDetails memberDetails = new MemberDetails(member);

        Authentication authToken
                = new UsernamePasswordAuthenticationToken(memberDetails,null,memberDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request,response);

    }
}