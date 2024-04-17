package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class BoardDetailDto {

    private Integer id;
    private String title;
    private String content;
    private String nickName;
    private Integer view;
    private String time;
    private List<CommentResponseDto> comments = new ArrayList<>();
    @Setter
    private List<String> imageUrls;

}
