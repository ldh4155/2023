package com.ilgoojo.backend.entity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class MyPageBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String content;
    private Integer view;
    private String create_time;
    private String modified_time;
    private Integer writer_id;
}
