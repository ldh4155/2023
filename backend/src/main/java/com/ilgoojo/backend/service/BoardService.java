package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.BoardDetailDto;
import com.ilgoojo.backend.dto.BoardWriteDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentService commentService;

    public BoardService(BoardRepository boardRepository, CommentService commentService,
                        MemberRepository memberRepository) {
        this.boardRepository = boardRepository;
        this.commentService = commentService;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Board boardWrite(BoardWriteDto boardWriteDto) {

        Member member = memberRepository.findById(boardWriteDto.getWriter())
                .orElseThrow(()-> new NoSuchElementException("사용자 아이디 오류"));
        Board board = new Board(boardWriteDto.getTitle(), boardWriteDto.getContent(),member);
        return boardRepository.save(board);

    }

    @Transactional
    public BoardDetailDto getBoardDetail(Integer id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));
        board.setView(board.getView() + 1); //조회수 증가
        boardRepository.save(board);

        return BoardDetailDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .nickName(board.getWriter().getNickName())
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
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요")); //영속화 (Board오브젝트)
        boardEntity.setTitle(board.getTitle());
        boardEntity.setContent(board.getContent());

        return boardEntity;
    }

    @Transactional
    public String boardDelete(Integer id) {
        boardRepository.deleteById(id);
        return "ok";
    }

    public List<Board> findBoardsByWriter(String writerId) {
        return boardRepository.findByWriter_Id(writerId);
    }

    public Board getBoardById(Integer id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board Id:" + id));

        return board;
    }
}
