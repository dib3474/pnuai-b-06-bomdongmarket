import { mockDelay } from '@/mocks/handlers';
import { mockRecommendation } from '@/mocks/mockSpaces';
import type { AiRecommendation, SpaceSummary } from '@/types/api';
import { getSpaces } from '@/services/spaceService';

export interface FarmerRecommendation extends SpaceSummary {
  matchingScore: number;
  recommendedCrop: string;
  expectedProfit: number;
}

export async function getFarmerRecommendations(): Promise<FarmerRecommendation[]> {
  await mockDelay();
  const spaces = await getSpaces({ size: 6, sort: 'rent' });

  // 추천 점수와 예상 수익은 AI/매칭 도메인 구현 전까지 데모 흐름을 이어주는 파생 mock 값입니다.
  return spaces.content.map((space, index) => ({
    ...space,
    matchingScore: [94, 88, 82, 77][index] ?? 74,
    recommendedCrop: ['버터헤드 상추', '바질', '루꼴라', '청경채'][index] ?? '허브',
    expectedProfit: [1160000, 780000, 920000, 690000][index] ?? 640000,
  }));
}

export async function runProfitPrediction(): Promise<AiRecommendation> {
  await mockDelay();
  return mockRecommendation;
}
