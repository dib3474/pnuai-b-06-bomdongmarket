import { HeroSection } from '@/pages/home/components/HeroSection';
import { MarketPreviewSection } from '@/pages/home/components/MarketPreviewSection';
import { ServiceOverviewSection } from '@/pages/home/components/ServiceOverviewSection';

// 온보딩, 역할 선택, 핵심 데모 진입점을 묶은 웹 첫 화면입니다.
export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceOverviewSection />
      <MarketPreviewSection />
    </>
  );
}
