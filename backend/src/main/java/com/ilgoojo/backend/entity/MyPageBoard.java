package com.ilgoojo.backend.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class MyPageBoard extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String content;
    private Integer view;
    private Integer writerId;
}
