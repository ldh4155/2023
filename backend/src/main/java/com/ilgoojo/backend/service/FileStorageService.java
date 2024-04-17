package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.BoardFile;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.ProfileImage;
import com.ilgoojo.backend.repository.BoardFileRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class FileStorageService {
    private final MemberRepository memberRepository;
    private final Path fileStorageLocation;
    private final String baseUrl;
    private final BoardFileRepository boardFileRepository;

    //@value() : application.prop 파일에서 해당하는 값 찾아 주입 -> properties파일에 해당하는 내용이 있어야함.
    @Autowired
    public FileStorageService(@Value("${file.upload-dir}") String uploadDir, //파일 업로드 할 디렉터리 위치
                              @Value("${image.base-url}") String baseUrl, //클라이언트가 이미지에 접근하기 위한 베이스 url
                              BoardFileRepository boardFileRepository, MemberRepository memberRepository) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize(); //상대경로면 -> 절대경로로 바꿈
        // . .. 을 해석해 명확한 경로 만들어줌
        this.baseUrl = baseUrl;
        this.boardFileRepository = boardFileRepository;
        this.memberRepository = memberRepository;
    }

    public String storeFile(MultipartFile file, String id) {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename(); //파일 이름 중복 방지
        try {
            File uploadFile = new File(fileStorageLocation + fileName);
            file.transferTo(uploadFile.toPath());

            Member member = memberRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("User not found with id " + id));

            // 기존의 ProfileImage가 존재한다면 삭제
            ProfileImage existingProfileImage = member.getProfileImageId();
            if (existingProfileImage != null) {
                // 기존 파일 삭제
                String existingFileName = existingProfileImage.getProfileImage();
                Path existingFilePath = fileStorageLocation.resolve(existingFileName);
                Files.deleteIfExists(existingFilePath);

                // Member와 ProfileImage의 관계 해제
                member.setProfileImageId(null);
            }

            // ProfileImage 엔티티 객체 생성 및 관계 설정
            ProfileImage profileImage = new ProfileImage();
            profileImage.setProfileImage(fileName);
            member.setProfileImageId(profileImage);

            memberRepository.save(member);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + file.getOriginalFilename(), ex);
        }
    }
    public List<String> storeBoardFile(List<MultipartFile> files, Board board) {
        List<String> fileNames = new ArrayList<>();

        for(MultipartFile file : files) {
            if(!file.isEmpty()) {
                try {
                    String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename(); //파일 이름 중복 방지
                    String imageUrl = baseUrl + fileName; //db에 저장할 이미지 접근 url

                    File uploadFile = new File(fileStorageLocation + "\\" +  fileName);
                    file.transferTo(uploadFile.toPath());

                    BoardFile boardFile = new BoardFile(file.getOriginalFilename(), fileName,
                            uploadFile.getAbsolutePath(), imageUrl, board);
                    boardFileRepository.save(boardFile);
                    fileNames.add(fileName);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return fileNames;
    }

    public List<String> getImageUrls(Integer boardId) {
        return boardFileRepository.findImageUrlsByBoardId(boardId);
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