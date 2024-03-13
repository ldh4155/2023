package com.ilgoojo.backend.dto;


import com.ilgoojo.backend.entity.Login;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Builder
public class CommentResponseDto {
    private String nickname;
    private String content;
    private String createTime;

}


