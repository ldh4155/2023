package com.ilgoojo.backend.util;

import jakarta.servlet.http.Cookie;

public class JwtRelatedUtil {

    public static Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key,value);
        cookie.setMaxAge(24*60*60);
        //cookie.setSecure(true); //https에 사용
        //cookie.setPath("/");  //쿠키 사용 범위 지정
        cookie.setHttpOnly(true); //js 접근 방어

        return cookie;
    }

}
