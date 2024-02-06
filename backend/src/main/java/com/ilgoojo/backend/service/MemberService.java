package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Transactional
public class MemberService {
    private MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public boolean checkId(String id) {
        return memberRepository.existsById(id);
    }
    public void signUp(Member member) {
        if (member.getName() == null) {
            member.setName("Name");
        }
        if (member.getNickName() == null) {
            member.setNickName("NickName");
        }
        if (member.getPhoneNumber() == null) {
            member.setPhoneNumber("000-0000-0000");
        }
        if (member.getAddress() == null) {
            member.setAddress("000-0000-0000");
        }
        if (member.getEmail() == null) {
            member.setEmail("default@email.com");
        }
        if (member.getBirth() == null) {
            member.setBirth(LocalDate.ofEpochDay(1111-11-11));
        }
        if (member.getNumberOfTransactions() == null) {
            member.setNumberOfTransactions(36);
        }
        if (member.getProfileImage() == null) {
            member.setProfileImage("logo192.png");
        }
        memberRepository.save(member);
    }
}
