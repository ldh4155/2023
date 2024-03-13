package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.ProfileImage;
import com.ilgoojo.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.UUID;
import com.ilgoojo.backend.repository.ProfileImageRepository;
@Service
public class FileStorageService {
    private final MemberRepository memberRepository;
    private final ProfileImageRepository profileImageRepository;
    private final Path fileStorageLocation = Paths.get("./frontend/public");

    @Autowired
    public FileStorageService(MemberRepository memberRepository, ProfileImageRepository profileImageRepository) {
        this.memberRepository = memberRepository;
        this.profileImageRepository = profileImageRepository;
        try {
            Files.createDirectories(fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, String memberId) {
        try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new NoSuchElementException("User not found with id " + memberId));

            ProfileImage profileImage = new ProfileImage();
            profileImage.setProfileImage(fileName);
            profileImageRepository.save(profileImage);
            member.setProfileImage(profileImage);
            memberRepository.save(member);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + file.getOriginalFilename() + ". Please try again!", ex);
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