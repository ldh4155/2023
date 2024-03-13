package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.BoardFile;
import com.ilgoojo.backend.repository.BoardFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private final String baseUrl;
    private final BoardFileRepository boardFileRepository;

    //@value() : application.prop 파일에서 해당하는 값 찾아 주입 -> properties파일에 해당하는 내용이 있어야함.
    @Autowired
    public FileStorageService(@Value("${file.upload-dir}") String uploadDir, //파일 업로드 할 디렉터리 위치
                              @Value("${image.base-url}") String baseUrl, //클라이언트가 이미지에 접근하기 위한 베이스 url
                              BoardFileRepository boardFileRepository) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize(); //상대경로면 -> 절대경로로 바꿈
        // . .. 을 해석해 명확한 경로 만들어줌
        this.baseUrl = baseUrl;
        this.boardFileRepository = boardFileRepository;
        try {
            Files.createDirectories(this.fileStorageLocation); //파일 저장할 디렉토리 없으면 생성
        } catch (Exception ex) {
            throw new FileStorageException("파일 저장 디렉토리를 생성할 수 없습니다.", ex);
        }
    }
    public String storeFile(MultipartFile file) {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename(); //파일 이름 중복 방지
        try {
            File uploadFile = new File(fileStorageLocation + fileName);
            file.transferTo(uploadFile.toPath());

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