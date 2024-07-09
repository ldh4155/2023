package com.ilgoojo.backend.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class RandomPwd {

    // 영문 알파벳
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // SecureRandom 인스턴스 생성
    private static final SecureRandom secureRandom;

    static {
        SecureRandom tempRandom = null;
        try {
            tempRandom = SecureRandom.getInstanceStrong();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            // 필요에 따라 기본 SecureRandom 사용
            tempRandom = new SecureRandom();
        }
        secureRandom = tempRandom;
    }

    public static String createCertificationNumber() {

        StringBuilder result = new StringBuilder(10);

        // 10자리의 난수 생성
        for (int i = 0; i < 10; i++) {
            // 0부터 35 사이의 난수 생성
            int randomIndex = secureRandom.nextInt(ALPHABET.length() + 10);

            // 숫자인 경우
            if (randomIndex < 10) {
                result.append(randomIndex);
            }
            // 알파벳인 경우
            else {
                // ALPHABET 문자열에서 랜덤한 영문 알파벳 선택하여 결과 추가
                result.append(ALPHABET.charAt(randomIndex - 10));
            }
        }

        return result.toString();
    }
}
