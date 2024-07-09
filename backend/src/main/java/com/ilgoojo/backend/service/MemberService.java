package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.*;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.ProfileImage;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.repository.ProfileImageRepository;
import com.ilgoojo.backend.util.RandomPwd;
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
    private final MailService mailService;

    public MemberService(MemberRepository memberRepository, ProfileImageRepository profileImageRepository,
                         BCryptPasswordEncoder bCryptPasswordEncoder, MailService mailService) {
        this.memberRepository = memberRepository;
        this.profileImageRepository = profileImageRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.mailService = mailService;
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

    public String findId(FindMemberDto findMemberDto) { //아이디 찾기
        Member findMember =
                memberRepository.findByNameAndEmail(findMemberDto.getName(), findMemberDto.getEmail());

        if(findMember == null)
            return  null;
        else
            return findMember.getId();

    }

    public boolean findPwd(FindPwdDto findPwdDto) { //임시 비밀번호 발급
        Member findMember = memberRepository.findByIdAndName(findPwdDto.getId(), findPwdDto.getName());

        if(findMember == null)
            return false;

        String pwd = RandomPwd.createCertificationNumber(); //임시 비밀번호 발급
        findMember.setPassword(bCryptPasswordEncoder.encode(pwd)); //암호화
        memberRepository.save(findMember); //임시 비밀번호 저장

        return mailService.sendMailForPwd(pwd, findMember.getEmail());
    }

    public boolean changePwd(String id, ChangePwd changePwd) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("회원을 찾을 수 없음"));

        if(findMember == null)
            return false;

        System.out.println("비밀번호 변경 성공: " + changePwd.getEditPwd());
        findMember.setPassword(bCryptPasswordEncoder.encode(changePwd.getEditPwd())); //암호화하여 비밀번호 변경
        memberRepository.save(findMember); //변경한 비밀번호 저장
        return true;
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
            // 추가적으로 수정하려는 필드가 있다면 위와 같은 방식으로 체크하고 설정하세요.
            return memberRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
    public MemberDto getMemberById(String id) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("회원 찾기 실패"));

        System.out.println("image url: " + findMember.getProfileImage().getUrl());
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

    public Integer chargeBalance(Integer charge, String memberId){
        Member targetMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + memberId));
        Integer balance = targetMember.getBalance() + charge;
        targetMember.setBalance(balance);
        return targetMember.getBalance();
    }
}