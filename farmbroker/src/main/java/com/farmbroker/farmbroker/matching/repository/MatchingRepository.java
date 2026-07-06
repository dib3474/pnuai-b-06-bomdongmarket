package com.farmbroker.farmbroker.matching.repository;

import com.farmbroker.farmbroker.matching.domain.Matching;
import com.farmbroker.farmbroker.matching.domain.MatchingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// 매칭 신청 레포지토리.
// - existsBySpaceIdAndFarmerIdAndStatus: 같은 공간에 대한 본인의 REQUESTED 중복 신청 차단용.
//   MySQL은 부분 유니크 인덱스를 지원하지 않아 DB 제약 대신 서비스 레이어에서 이 체크로 방지한다.
// - findAllReceivedByOwnerId: space·farmer를 fetch join으로 함께 로딩해 목록 응답 조립 시 N+1을 막는다.
public interface MatchingRepository extends JpaRepository<Matching, Long> {

    boolean existsBySpaceIdAndFarmerIdAndStatus(Long spaceId, Long farmerId, MatchingStatus status);

    // 내가 farmer로서 신청한 목록 — 공간 정보는 SpaceService.getSummariesByIds 배치로 별도 조회
    List<Matching> findAllByFarmerIdOrderByCreatedAtDesc(Long farmerId);

    // 내가 owner인 공간들에 들어온 신청 목록
    @Query("SELECT m FROM Matching m JOIN FETCH m.space s JOIN FETCH m.farmer " +
            "WHERE s.owner.id = :ownerId ORDER BY m.createdAt DESC")
    List<Matching> findAllReceivedByOwnerId(@Param("ownerId") Long ownerId);
}
