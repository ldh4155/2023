package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.repository.BoardRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final EntityManager entityManager;

    @Transactional
    public Board boardWrite(Board board) {
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

    public List<Board> boardList() {
        return boardRepository.findAll();
    }

    @Transactional
    public Board boardModify(Integer id, Board board) {
        Board boardEntity = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("id를 확인해주세요")); //영속화 (Board오브젝트)
        boardEntity.setTitle(board.getTitle());
        boardEntity.setContent(board.getContent());

        return boardEntity;
    }

    @Transactional
    public String boardDelete(Integer id) {
        boardRepository.deleteById(id);
        return "ok";
    }

}