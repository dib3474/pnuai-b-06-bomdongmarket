import { Filter, MapPinned, Search } from 'lucide-react';
import { useState } from 'react';

import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { Input } from '@/components/common/Input';
import { LoadingState } from '@/components/common/LoadingState';
import { PageContainer } from '@/components/layout/PageContainer';
import { farmerFilterChips } from '@/pages/farmer/constants/farmerContent';
import { RecommendationCard } from '@/pages/farmer/components/RecommendationCard';
import { useFarmerRecommendations } from '@/pages/farmer/hooks/useFarmerRecommendations';

// 도심 농부가 추천 공간을 탐색하고 매칭 상세로 이어지는 화면입니다.
export function FarmerPage() {
  const { recommendations, status, error, reload } = useFarmerRecommendations();
  const [keyword, setKeyword] = useState('');
  const [activeFilter, setActiveFilter] = useState('면적');

  // 현재 데모에서는 검색어 필터만 실제로 적용하고, 칩은 발표 중 조건 선택 UI를 보여주는 용도입니다.
  const filtered = recommendations.filter((item) =>
    `${item.title} ${item.address} ${item.recommendedCrop}`
      .toLowerCase()
      .includes(keyword.toLowerCase()),
  );

  return (
    <PageContainer>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-soil-500">
            농부 매칭
          </p>
          <h1 className="mt-2 text-3xl font-black text-ink-900 sm:text-4xl">추천 공간</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            매칭 점수, 예상 수익, 추천 작물, 월세를 비교한 뒤 매칭 신청을 보낼 수
            있습니다.
          </p>
        </div>
        <div className="rounded-app border border-leaf-100 bg-white p-3 text-sm font-semibold text-leaf-800 shadow-card">
          <MapPinned className="mr-2 inline h-4 w-4 align-[-2px]" aria-hidden />
          부산 스마트팜 지도 미리보기
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-app border border-leaf-100 bg-white p-4 shadow-card lg:grid-cols-[1fr_auto]">
        <Input
          aria-label="추천 공간 검색"
          icon={<Search className="h-4 w-4" aria-hidden />}
          placeholder="작물, 지역, 공간명 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" aria-hidden />
          {farmerFilterChips.map((chip) => (
            <button
              key={chip}
              className={`min-h-10 rounded-full px-3 text-sm font-bold transition ${
                activeFilter === chip
                  ? 'bg-leaf-700 text-white'
                  : 'bg-leaf-50 text-leaf-800 hover:bg-leaf-100'
              }`}
              onClick={() => setActiveFilter(chip)}
              type="button"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {status === 'loading' || status === 'idle' ? (
          <LoadingState label="추천 공간을 불러오는 중입니다" />
        ) : null}
        {status === 'error' ? (
          <ErrorState
            message={error ?? '추천 공간을 불러오지 못했습니다'}
            onRetry={reload}
          />
        ) : null}
        {status === 'success' && filtered.length === 0 ? (
          <EmptyState
            title="추천 공간이 없습니다"
            description="검색어를 지우거나 다른 필터를 선택해보세요."
          />
        ) : null}
        {status === 'success'
          ? filtered.map((recommendation) => (
              <RecommendationCard
                key={recommendation.spaceId}
                recommendation={recommendation}
              />
            ))
          : null}
      </div>
    </PageContainer>
  );
}
