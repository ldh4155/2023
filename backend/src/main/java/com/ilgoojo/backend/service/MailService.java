package com.ilgoojo.backend.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async //비동기로 실행
    public boolean sendMailForPwd(String pwd, String email) {
        String content = String.format("<br> 임시비밀번호: %s <br><br><br> 로그인 후 마이페이지에서 비밀번호를 수정해주세요.",
                pwd);

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

            // 수신자, 제목, 내용 설정
            helper.setTo(email);
            helper.setSubject("비밀번호 변경 메일");
            helper.setText(content, true); // html변환 전달

            // 메일 전송
            javaMailSender.send(mimeMessage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
