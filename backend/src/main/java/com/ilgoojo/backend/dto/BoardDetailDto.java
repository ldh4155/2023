package com.ilgoojo.backend.dto;

import com.ilgoojo.backend.entity.BoardFile;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class BoardDetailDto {

    private Integer id;
    private String title;
    private String content;
    private String memberId;
    private String nickName;
    private Integer view;
    private String time;
    private String category;
    private List<CommentResponseDto> comments = new ArrayList<>();
    private List<String> imageUrls;
    private BoardFile.FileType fileType;
    private List<String> originalFileName;

    public void setOriginalFileName(List<String> originalFileName) {
        this.originalFileName = originalFileName;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}

