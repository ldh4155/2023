package com.ilgoojo.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class CommentResponseDto {
    private String memberNickName;
    private String content;
    private String createTime;
}
