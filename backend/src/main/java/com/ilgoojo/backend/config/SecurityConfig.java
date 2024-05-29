package com.ilgoojo.backend.config;

import com.ilgoojo.backend.jwt.CustomSignOutFilter;
import com.ilgoojo.backend.jwt.JWTFilter;
import com.ilgoojo.backend.jwt.JWTUtil;
import com.ilgoojo.backend.jwt.SignInFilter;
import com.ilgoojo.backend.repository.RefreshRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration configuration;
    private final JWTUtil jwtUtil;

    private final RefreshRepository refreshRepository;

    public SecurityConfig(AuthenticationConfiguration configuration, JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.configuration = configuration;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() { // security를 적용하지 않을 리소스
        return web -> web.ignoring()
                // error endpoint를 열어줘야 함, favicon.ico 추가!
                .requestMatchers("/error", "/favicon.ico");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors((cors) -> cors.configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                configuration.setAllowedMethods(Collections.singletonList("*"));
                configuration.setAllowCredentials(true);
                configuration.setAllowedHeaders(Collections.singletonList("*"));
                configuration.setMaxAge(3600L);


                configuration.setExposedHeaders(Collections.singletonList("Access"));

                return configuration;
            }
        }));

        //csrf disable
        http.csrf((auth) -> auth.disable());
        //Form 로그인 방식 disable
        http.formLogin((auth) -> auth.disable());
        //http basic 인증 방식 disable
        http.httpBasic((auth) -> auth.disable());
        //어느 api는 인가 없이 들어올지
        http.authorizeHttpRequests((auth) -> auth
                .requestMatchers("/login", "/signup", "/","/images/**","/reissue").permitAll()
                .requestMatchers(HttpMethod.GET, "/board/**").permitAll()
                .anyRequest().authenticated());

        http.addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        //로그인 필터 등록
        http.addFilterAt(new SignInFilter(authenticationManager(configuration), jwtUtil, refreshRepository), UsernamePasswordAuthenticationFilter.class);

        http.addFilterBefore(new CustomSignOutFilter(jwtUtil,refreshRepository), LogoutFilter.class);
        //세션 설정
        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
