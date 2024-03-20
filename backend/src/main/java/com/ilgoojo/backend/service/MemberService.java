package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.MemberDto;
import com.ilgoojo.backend.dto.SignInDto;
import com.ilgoojo.backend.dto.SignUpDto;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.ProfileImage;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.repository.ProfileImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final ProfileImageRepository profileImageRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder; //비밀번호

    public MemberService(MemberRepository memberRepository, ProfileImageRepository profileImageRepository,
                         BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.memberRepository = memberRepository;
        this.profileImageRepository = profileImageRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public boolean checkId(String id) {
        return memberRepository.existsById(id);
    }

    public boolean signUp(SignUpDto signUpDto) {
        try {
            ProfileImage defaultImage = profileImageRepository.findById(1L)
                    .orElseThrow(()-> new NoSuchElementException("not found default image"));
            Member member = new Member(signUpDto.getId(), bCryptPasswordEncoder.encode(signUpDto.getPassword()),
                    signUpDto.getName(), signUpDto.getNickName(), signUpDto.getPhone(),signUpDto.getAddress(),
                    signUpDto.getEmail(), signUpDto.getBirth(), defaultImage);
            memberRepository.save(member);
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;


    }

//    public boolean signIn(SignInDto signInDto) {
//        Member findMember = memberRepository.findById(signInDto.getId())
//                .orElse(null);
//
//        if(findMember == null)
//            return false;
//        else {
//            if(!findMember.getPassword().equals(signInDto.getPassword()))
//                return false;
//            else
//                return true;
//        }
//    }

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
    public MemberDto getMemberById(String id) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("회원 찾기 실패"));

        return MemberDto.builder()
                .id(findMember.getId())
                .name(findMember.getName())
                .nickName(findMember.getNickName())
                .imageUrl(findMember.getProfileImage().getUrl())
                .birth(findMember.getBirth())
                .numberOfTransactions(findMember.getNumberOfTransactions())
                .email(findMember.getEmail())
                .address(findMember.getAddress())
                .phone(findMember.getPhoneNumber())
                .build();
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
}


