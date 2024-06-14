package com.ilgoojo.backend.repository;

import com.ilgoojo.backend.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    @Query("SELECT b FROM Board b WHERE " +
            "((:city1 IS NULL OR b.address LIKE %:city1%) OR " +
            "(:city2 IS NULL OR b.address LIKE %:city2%) OR " +
            "(:city3 IS NULL OR b.address LIKE %:city3%) OR " +
            "(:city4 IS NULL OR b.address LIKE %:city4%) OR " +
            "(:city5 IS NULL OR b.address LIKE %:city5%) OR " +
            "(:city1 IS NULL AND :city2 IS NULL AND :city3 IS NULL AND :city4 IS NULL AND :city5 IS NULL)) AND " +
            "(:category IS NULL OR b.category = :category)")
    List<Board> findByAddressContainingAndCategory(
            @Param("city1") String city1,
            @Param("city2") String city2,
            @Param("city3") String city3,
            @Param("city4") String city4,
            @Param("city5") String city5,
            @Param("category") String category);

    @Query("SELECT b FROM Board b WHERE " +
            "(:city1 IS NULL OR b.address LIKE %:city1%) OR " +
            "(:city2 IS NULL OR b.address LIKE %:city2%) OR " +
            "(:city3 IS NULL OR b.address LIKE %:city3%) OR " +
            "(:city4 IS NULL OR b.address LIKE %:city4%) OR " +
            "(:city5 IS NULL OR b.address LIKE %:city5%)")
    List<Board> findByAddressContainingAny(
            @Param("city1") String city1,
            @Param("city2") String city2,
            @Param("city3") String city3,
            @Param("city4") String city4,
            @Param("city5") String city5);

    @Query("SELECT b FROM Board b WHERE b.title LIKE %:keyword% OR b.content LIKE %:keyword% ORDER BY createTime DESC")
    Page<Board> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT b FROM Board b ORDER BY b.view DESC")
    Page<Board> findByOrderByViewDesc(Pageable pageable);

    List<Board> findByWriter_Id(String writerId);

    List<Board> findByCategory(@Param("category") String category);
}
