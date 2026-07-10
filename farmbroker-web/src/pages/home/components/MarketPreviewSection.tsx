import { ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/common/Badge';
import { buttonStyles } from '@/components/common/buttonStyles';
import { PageContainer } from '@/components/layout/PageContainer';
import { ROUTES } from '@/constants/routes';
import { marketPreviewItems } from '@/pages/home/constants/homeContent';

// 로컬 마켓의 신선도와 이력 추적 가치를 홈 하단에서 미리 보여줍니다.
export function MarketPreviewSection() {
  return (
    <section
      className="border-y border-leaf-100 bg-white"
      aria-labelledby="market-preview-title"
    >
      <PageContainer className="grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Badge tone="yellow">로컬 마켓</Badge>
          <h2
            id="market-preview-title"
            className="mt-3 text-2xl font-black text-ink-900 sm:text-3xl"
          >
            근처 스마트팜의 신선한 작물을 생산 이력과 함께 확인하세요.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            소비자는 장바구니에 담기 전에 수확일, 푸드 마일리지, 생산자 정보를 비교할 수
            있습니다.
          </p>
          <Link
            className={buttonStyles({ className: 'mt-6 w-full sm:w-auto' })}
            to={ROUTES.market}
          >
            <ShoppingBasket className="h-5 w-5" aria-hidden />
            마켓 열기
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {marketPreviewItems.map((item, index) => (
            <div
              key={item}
              className="min-h-28 rounded-app border border-leaf-100 bg-leaf-50 p-4"
            >
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-leaf-600">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-bold text-ink-900">{item}</h3>
              <p className="mt-1 text-sm text-slate-600">24시간 이내 수확</p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
