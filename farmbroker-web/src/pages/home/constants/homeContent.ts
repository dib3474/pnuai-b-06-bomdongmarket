import {
  Building2,
  ClipboardList,
  Landmark,
  ShoppingBasket,
  Sprout,
  TrendingUp,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';

export const heroContent = {
  title: '비어 있는 공간을 도심 스마트팜으로 바꾸세요',
  description:
    '공간 제공자, 도심 농부, 로컬 소비자를 하나의 순환형 스마트팜 플랫폼에서 연결합니다.',
  imageUrl:
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1600&q=80',
  primaryCta: { label: '시작하기', href: ROUTES.dashboard },
  secondaryCta: { label: '마켓 둘러보기', href: ROUTES.market },
};

export const valuePoints = [
  {
    label: '공실 수익화',
    description: '비어 있는 도심 공간을 등록하고 검증된 농부의 매칭 신청을 받습니다.',
    icon: Building2,
  },
  {
    label: '스마트팜 시작',
    description: '투자 전에 AI 작물 추천과 공간 적합도를 먼저 확인합니다.',
    icon: Sprout,
  },
  {
    label: '로컬 신선 농산물 구매',
    description: '우리 동네 가까운 스마트팜에서 수확한 이력 확인 농산물을 구매합니다.',
    icon: ShoppingBasket,
  },
];

export const roleCards = [
  {
    label: '공간 제공자',
    description: '사용하지 않는 공간을 등록하고 계약을 관리합니다.',
    icon: Landmark,
    href: ROUTES.newSpace,
  },
  {
    label: '도심 농부',
    description: '재배에 적합한 공간을 찾고 스마트팜 운영을 시작합니다.',
    icon: Sprout,
    href: ROUTES.farmer,
  },
  {
    label: '로컬 소비자',
    description: '근처 스마트팜의 신선한 농산물을 구매합니다.',
    icon: ShoppingBasket,
    href: ROUTES.market,
  },
];

export const quickActions = [
  {
    label: '공간 등록',
    description: '주소, 시설, 임대료, 사진 정보를 입력합니다.',
    icon: Building2,
    href: ROUTES.newSpace,
  },
  {
    label: '수익 시뮬레이션',
    description: '작물, 예상 수확량, 비용, 회수 기간을 계산합니다.',
    icon: TrendingUp,
    href: ROUTES.prediction,
  },
  {
    label: '매칭 찾기',
    description: '농부에게 적합한 추천 공간을 순위별로 확인합니다.',
    icon: ClipboardList,
    href: ROUTES.farmer,
  },
];

export const marketPreviewItems = ['버터헤드 상추', '바질', '루꼴라', '청경채'] as const;
