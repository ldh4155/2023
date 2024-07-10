package com.ilgoojo.backend.entity;

import com.ilgoojo.backend.entity.Board;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "board_file")
public class BoardFile{


    public enum FileType {
        @Enumerated(EnumType.STRING)
        IMAGE, VIDEO
    }

    public BoardFile(String originalFileName, String storedFileName,
                     String filePath, String imageUrl, Board board, FileType fileType) {

        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
        this.filePath = filePath;
        this.imageUrl = imageUrl;
        this.board = board;
        this.fileType = fileType;

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private FileType fileType;
    @Column
    private String originalFileName;
    @Column
    private String storedFileName;
    @Column
    private String filePath;
    @Column
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

}