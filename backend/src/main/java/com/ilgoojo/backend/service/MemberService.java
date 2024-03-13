package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;


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
            member.setAddress("korea");
        }
        if (member.getEmail() == null) {
            member.setEmail("default@email.com");
        }
        if (member.getBirth() == null) {
            member.setBirth(LocalDate.of(1111, 11, 11));
        }
        if (member.getNumberOfTransactions() == null) {
            member.setNumberOfTransactions(36);
        }
        memberRepository.save(member);
    }
    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
    public String login(String id, String password) {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            if (member.getPassword().equals(password)) {
                String token = member.getId();
                return token;
            }
            else return null;
        }
        return null;
    }
    public Member updateUser(String id, Member newUserInfo) {
        return memberRepository.findById(id).map(user -> {
            if (newUserInfo.getNickName() != null) {
                user.setNickName(newUserInfo.getNickName());
            }
            if (newUserInfo.getName() != null) {
                user.setName(newUserInfo.getName());
            }
            if (newUserInfo.getPhoneNumber() != null) {
                user.setPhoneNumber(newUserInfo.getPhoneNumber());
            }
            if (newUserInfo.getAddress() != null) {
                user.setAddress(newUserInfo.getAddress());
            }
            if (newUserInfo.getEmail() != null) {
                user.setEmail(newUserInfo.getEmail());
            }
            if (newUserInfo.getBirth() != null) {
                user.setBirth(newUserInfo.getBirth());
            }
            if (newUserInfo.getPassword() != null) {
                user.setPassword(newUserInfo.getPassword());
            }
            // 추가적으로 수정하려는 필드가 있다면 위와 같은 방식으로 체크하고 설정하세요.
            return memberRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
    public Member getMemberById(String id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
}
