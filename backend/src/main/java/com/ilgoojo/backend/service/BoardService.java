package com.ilgoojo.backend.service;

import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Supplier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public Board boardWrite(Board board) {
        return boardRepository.save(board);
    }

    @Transactional(readOnly = true) //변경감지X
    public Board boardDetail(Integer id) {
        return boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("id를 확인해주세요"));
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
