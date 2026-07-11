import { APP_INFO } from '@/constants/appInfo';
import type { ApiResponse } from '@/types/api';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string;
};

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

export async function apiRequest<T>(
  endpoint: string,
  { body, headers, token, ...options }: RequestOptions = {},
): Promise<ApiResponse<T>> {
  // mock을 끄고 실제 백엔드를 연결할 때 모든 서비스가 이 래퍼를 통과합니다.
  // 토큰 처리와 공통 ApiResponse 파싱을 한곳에 모아 API 명세 변경 영향을 줄입니다.
  const response = await fetch(`${APP_INFO.baseUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || '요청 처리에 실패했습니다');
  }

  return payload;
}
