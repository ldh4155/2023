package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.BoardDetailDto;
import com.ilgoojo.backend.dto.BoardWriteDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.util.DateUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentService commentService;

    public BoardService(BoardRepository boardRepository, CommentService commentService) {
        this.boardRepository = boardRepository;
        this.commentService = commentService;
    }

    @Transactional
    public Board boardWrite (BoardWriteDto boardWriteDto) {
        Board board = new Board(boardWriteDto.getTitle(),boardWriteDto.getContent());
        return boardRepository.save(board);
    }

    @Transactional(readOnly = true)
    public Board boardDetail(Integer id) {
        return boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("id를 확인해주세요"));
    }

    @Transactional
    public BoardDetailDto getBoardDetail(Integer id) {
        Board board = boardDetail(id);
        return BoardDetailDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .view(board.getView())
                .comments(commentService.showComments(id))
                .time(DateUtil.FormatDate(board.getCreateTime()))
                .build();
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