package com.farmbroker.farmbroker.space.repository;

import com.farmbroker.farmbroker.space.domain.Space;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Space 조회는 공개 API 기준으로 deleted=false 조건을 기본 포함한다.
// 예외: BE3 내부 인터페이스(getSummaryById 등)는 deleted 여부 무관하게 findById를 사용한다.
public interface SpaceRepository extends JpaRepository<Space, Long> {

    // 공개 상세 조회 — 삭제된 공간은 404 처리 대상
    Optional<Space> findByIdAndDeletedFalse(Long id);

    // 내가 등록한 공간 — status 무관 전부, 삭제 제외, 최신순
    List<Space> findByOwnerIdAndDeletedFalseOrderByCreatedAtDesc(Long ownerId);
}
