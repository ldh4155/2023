package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.ProfileImage;
import com.ilgoojo.backend.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class FileStorageService {
    private final MemberRepository memberRepository;
    private final Path fileStorageLocation = Paths.get("./frontend/public");

    public FileStorageService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public String storeFile(MultipartFile file, String id) {
        try {
            Files.createDirectories(fileStorageLocation);

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path targetLocation = fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            Member member = memberRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("User not found with id " + id));

            // 기존의 ProfileImage가 존재한다면 삭제
            ProfileImage existingProfileImage = member.getProfileImage();
            if (existingProfileImage != null) {
                // 기존 파일 삭제
                String existingFileName = existingProfileImage.getProfileImage();
                Path existingFilePath = fileStorageLocation.resolve(existingFileName);
                Files.deleteIfExists(existingFilePath);

                // Member와 ProfileImage의 관계 해제
                member.setProfileImage(null);
            }

            // ProfileImage 엔티티 객체 생성 및 관계 설정
            ProfileImage profileImage = new ProfileImage();
            profileImage.setProfileImage(fileName);
            member.setProfileImage(profileImage);

            memberRepository.save(member);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + file.getOriginalFilename(), ex);
        }
    }
    public static class FileStorageException extends RuntimeException {
        public FileStorageException(String message) {
            super(message);
        }

        public FileStorageException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}