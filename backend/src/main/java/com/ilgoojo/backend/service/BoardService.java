package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.BoardFile;
import com.ilgoojo.backend.repository.BoardRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @PersistenceContext
    private EntityManager entityManager;


    @Transactional
    public Board boardWrite(Board board, MultipartFile file) throws Exception {
        String projectPath = System.getProperty("user dir") + "\\src\\main\\resources\\static\\files";
        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);
        return boardRepository.save(board);
    }

    @Transactional(readOnly = true)
    public Board boardDetail(Integer id) {
        return boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("id를 확인해주세요"));
    }

    @Transactional(readOnly = true)
    public Page<Board> boardList(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    public Page<Board> getBoards(int page, int size, String keyword) {
        return boardRepository.findByKeyword(keyword, PageRequest.of(page, size));
    }

    @Transactional
    public void increaseView(Integer id) {
        Board board = boardRepository.findById(id).get();
        board.setView(board.getView()+1);
    }

    public List<Board> boardList() {
        return boardRepository.findAll();
    }

    @Transactional
    public Board boardModify(Integer id, Board board) {
        Board boardEntity = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("id를 확인해주세요")); //영속화 (Board오브젝트)
        boardEntity.setTitle(board.getTitle());
        boardEntity.setContent(board.getContent());

        return null;
    }

    @Transactional
    public String boardDelete(Integer id) {
        boardRepository.deleteById(id);
        return "ok";
    }

}
