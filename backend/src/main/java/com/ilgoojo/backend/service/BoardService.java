package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.BoardWriteDto;
import com.ilgoojo.backend.dto.BoardDetailDto;
import com.ilgoojo.backend.entity.Board;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.repository.BoardRepository;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentService commentService;
    private final FileStorageService fileStorageService;

    @Autowired
    public BoardService(BoardRepository boardRepository, CommentService commentService,
                        MemberRepository memberRepository, FileStorageService fileStorageService) {
        this.boardRepository = boardRepository;
        this.commentService = commentService;
        this.memberRepository = memberRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public Board boardWrite(BoardWriteDto boardWriteDto) {
        Member member = memberRepository.findById(boardWriteDto.getWriter())
                .orElseThrow(() -> new NoSuchElementException("사용자 아이디 오류"));
        Board board = new Board(boardWriteDto.getTitle(), boardWriteDto.getContent(), member, member.getAddress(), boardWriteDto.getCategory());
        return boardRepository.save(board);
    }

    @Transactional
    public BoardDetailDto getBoardDetail(Integer id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));
        board.setView(board.getView() + 1); // 조회수 증가
        boardRepository.save(board);

        return BoardDetailDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .memberId(board.getWriter().getId())
                .nickName(board.getWriter().getNickName())
                .view(board.getView())
                .comments(commentService.showComments(id))
                .time(DateUtil.FormatDate(board.getCreateTime()))
                .category(board.getCategory()) // 카테고리 추가
                .build();
    }

    @Transactional(readOnly = true)
    public Page<Board> boardList(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    public Page<Board> getBoards(int page, int size, String keyword) {
        return boardRepository.findByKeyword(keyword, PageRequest.of(page, size));
    }

    public Page<Board> getBoardsByView(int page, int size) {
        return boardRepository.findByOrderByViewDesc(PageRequest.of(page, size));
    }

    public List<Board> boardList() {
        return boardRepository.findAll();
    }

    @Transactional
    public Board boardModify(Integer id, Board board) {
        Board boardEntity = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요")); // 영속화 (Board 오브젝트)
        boardEntity.setTitle(board.getTitle());
        boardEntity.setContent(board.getContent());
        boardEntity.setCategory(board.getCategory()); // 카테고리 업데이트

        return boardEntity;
    }

    @Transactional
    public String boardDelete(Integer id) {
        boardRepository.deleteById(id);
        fileStorageService.deleteImage(id);
        return "ok";
    }

    public List<Board> findBoardsByWriter(String writerId) {
        return boardRepository.findByWriter_Id(writerId);
    }

    public Board getBoardById(Integer id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board Id:" + id));
    }

    public List<Board> getBoardsByCities(List<String> cities) {
        String city1 = cities.size() > 0 ? cities.get(0) : null;
        String city2 = cities.size() > 1 ? cities.get(1) : null;
        String city3 = cities.size() > 2 ? cities.get(2) : null;
        String city4 = cities.size() > 3 ? cities.get(3) : null;
        String city5 = cities.size() > 4 ? cities.get(4) : null;

        return boardRepository.findByAddressContainingAny(city1, city2, city3, city4, city5);
    }

    public List<Board> getBoardsByCitiesAndCategory(List<String> cities, String category) {
        String city1 = cities.size() > 0 ? cities.get(0) : null;
        String city2 = cities.size() > 1 ? cities.get(1) : null;
        String city3 = cities.size() > 2 ? cities.get(2) : null;
        String city4 = cities.size() > 3 ? cities.get(3) : null;
        String city5 = cities.size() > 4 ? cities.get(4) : null;

        return boardRepository.findByAddressContainingAndCategory(city1, city2, city3, city4, city5, category);
    }

    public List<Board> getBoardsByCategory(String category) {
        return boardRepository.findByCategory(category);
    }
}
