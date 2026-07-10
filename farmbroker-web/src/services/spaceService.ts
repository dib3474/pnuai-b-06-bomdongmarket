import { apiRequest, USE_MOCKS } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { createMockPage, mockDelay } from '@/mocks/handlers';
import { mockRecommendation, mockSpaces } from '@/mocks/mockSpaces';
import type {
  AiRecommendation,
  PageResponse,
  SpaceCreateInput,
  SpaceDetail,
  SpaceSearchParams,
  SpaceSummary,
} from '@/types/api';

function toSummary(space: SpaceDetail): SpaceSummary {
  // 목록 카드에는 상세 필드가 필요 없으므로 API 명세의 요약 DTO 형태로 잘라냅니다.
  const { spaceId, title, address, area, monthlyRent, status, imageUrl } = space;
  return { spaceId, title, address, area, monthlyRent, status, imageUrl };
}

function applySearch(spaces: SpaceDetail[], params: SpaceSearchParams = {}) {
  const keyword = params.keyword?.trim().toLowerCase();
  // 공개 목록은 삭제되지 않은 AVAILABLE 공간만 노출한다는 백엔드2 명세를 mock에도 반영합니다.
  let result = spaces.filter((space) => space.status === 'AVAILABLE');

  if (keyword) {
    result = result.filter(
      (space) =>
        space.title.toLowerCase().includes(keyword) ||
        space.address.toLowerCase().includes(keyword),
    );
  }

  if (params.minArea) {
    result = result.filter((space) => space.area >= Number(params.minArea));
  }

  if (params.maxRent) {
    result = result.filter((space) => space.monthlyRent <= Number(params.maxRent));
  }

  if (params.sort === 'area') {
    result = [...result].sort((a, b) => b.area - a.area);
  } else if (params.sort === 'rent') {
    result = [...result].sort((a, b) => a.monthlyRent - b.monthlyRent);
  } else {
    result = [...result].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  return result;
}

export async function getSpaces(
  params: SpaceSearchParams = {},
): Promise<PageResponse<SpaceSummary>> {
  if (!USE_MOCKS) {
    // 실제 서버 연결 시에는 query parameter를 그대로 전달해 백엔드 검색/정렬과 맞춥니다.
    const response = await apiRequest<PageResponse<SpaceSummary>>(
      `${ENDPOINTS.spaces.list}?${new URLSearchParams(params as Record<string, string>)}`,
    );
    return response.data;
  }

  await mockDelay();
  const filtered = applySearch(mockSpaces, params).map(toSummary);
  return createMockPage(filtered, params.page ?? 0, params.size ?? 10);
}

export async function getSpaceDetail(spaceId: number): Promise<SpaceDetail> {
  if (!USE_MOCKS) {
    const response = await apiRequest<SpaceDetail>(ENDPOINTS.spaces.detail(spaceId));
    return response.data;
  }

  await mockDelay();
  const space = mockSpaces.find((item) => item.spaceId === spaceId);
  if (!space) {
    throw new Error('공간을 찾을 수 없습니다');
  }
  return space;
}

export async function getMySpaces(): Promise<SpaceSummary[]> {
  await mockDelay();
  return mockSpaces.map(toSummary);
}

export async function createSpace(input: SpaceCreateInput): Promise<SpaceDetail> {
  await mockDelay();
  // 실제 POST 응답처럼 생성된 ID와 시간값을 붙여 등록 완료 화면을 자연스럽게 보여줍니다.
  return {
    ...mockSpaces[0],
    ...input,
    spaceId: 99,
    imageUrl: input.imageUrls?.[0] ?? mockSpaces[0].imageUrl,
    imageUrls: input.imageUrls ?? [],
    status: 'AVAILABLE',
    owner: { userId: 1, nickname: '데모 공간 제공자' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getRecommendation(spaceId: number): Promise<AiRecommendation> {
  await mockDelay();
  return { ...mockRecommendation, spaceId };
}
