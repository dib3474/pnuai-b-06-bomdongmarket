import { ArrowRight, Camera, CheckCircle2, Upload } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { PageContainer } from '@/components/layout/PageContainer';
import { ROUTES } from '@/constants/routes';
import { createSpace } from '@/services/spaceService';
import { registrationSteps } from '@/pages/spaces/constants/spaceOptions';

// 공실 제공자가 API 명세의 필수 공간 필드를 입력하는 모바일 우선 등록 폼입니다.
export function SpaceCreatePage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSaving(true);

    // 데모에서는 FormData를 API 요청 DTO와 같은 모양으로 정리한 뒤 mock 서비스에 전달합니다.
    // 이 변환부만 실제 업로드/주소검색 API와 연결하면 화면 컴포넌트는 그대로 유지할 수 있습니다.
    await createSpace({
      title: String(formData.get('title')),
      address: String(formData.get('address')),
      area: Number(formData.get('area')),
      monthlyRent: Number(formData.get('monthlyRent')),
      floor: Number(formData.get('floor')),
      hasWater: formData.get('hasWater') === 'on',
      hasElectricity: formData.get('hasElectricity') === 'on',
      hasVentilation: formData.get('hasVentilation') === 'on',
      description: String(formData.get('description')),
      imageUrls: [],
    });

    setIsSaving(false);
    setSaved(true);
  }

  return (
    <PageContainer narrow>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-soil-500">
          공간 등록
        </p>
        <h1 className="mt-2 text-3xl font-black text-ink-900">새 재배 공간 등록</h1>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-2">
        {registrationSteps.map((step, index) => (
          <div key={step}>
            <div className="h-1.5 rounded-full bg-leaf-100">
              <div
                className="h-full rounded-full bg-leaf-700"
                style={{ width: `${index === 0 ? 100 : index === 1 ? 66 : 33}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-500">{step}</p>
          </div>
        ))}
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <Card className="grid gap-4 p-5">
          <Input
            defaultValue="부산대 앞 20평 상가 공실"
            label="공간 이름"
            name="title"
            required
          />
          <Input
            defaultValue="부산광역시 금정구 장전동"
            label="공간 위치"
            name="address"
            required
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              defaultValue="66"
              label="전체 면적"
              min={1}
              name="area"
              type="number"
            />
            <Input defaultValue="2" label="층수" name="floor" type="number" />
            <Input
              defaultValue="500000"
              label="희망 월세"
              min={0}
              name="monthlyRent"
              type="number"
            />
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-bold text-ink-900">공간 조건</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ['hasWater', '수도 사용 가능'],
              ['hasElectricity', '전기 사용 가능'],
              ['hasVentilation', '환기 가능'],
            ].map(([name, label]) => (
              <label
                key={name}
                className="flex min-h-12 items-center gap-3 rounded-app border border-leaf-100 bg-leaf-50 px-3 text-sm font-semibold text-ink-700"
              >
                <input
                  className="h-4 w-4 accent-leaf-700"
                  defaultChecked
                  name={name}
                  type="checkbox"
                />
                {label}
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-medium text-ink-700">
            상세 메모
            <textarea
              className="mt-2 min-h-28 w-full rounded-app border border-leaf-100 bg-white px-3 py-3 text-sm text-ink-900 focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-200"
              defaultValue="채광이 좋고 수도 사용이 가능하며 다단 재배 선반을 배치할 수 있는 상가 공간입니다."
              name="description"
            />
          </label>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-ink-900">사진 업로드</h2>
              <p className="mt-1 text-sm text-slate-600">
                카드에 노출될 순서대로 이미지를 등록합니다.
              </p>
            </div>
            <Camera className="h-8 w-8 text-leaf-700" aria-hidden />
          </div>
          <button
            className="mt-4 flex min-h-28 w-full flex-col items-center justify-center rounded-app border border-dashed border-leaf-300 bg-leaf-50 text-sm font-semibold text-leaf-800"
            type="button"
          >
            <Upload className="mb-2 h-6 w-6" aria-hidden />
            사진 업로드
          </button>
        </Card>

        {saved ? (
          <div className="rounded-app border border-leaf-200 bg-leaf-50 p-4 text-leaf-900">
            <CheckCircle2 className="inline h-5 w-5 align-[-4px]" aria-hidden /> 공간이
            데모 데이터에 저장되었습니다. 수익 예측 화면으로 이어서 확인해보세요.
          </div>
        ) : null}

        <div className="sticky bottom-20 z-10 rounded-app border border-leaf-100 bg-white p-3 shadow-lift lg:static lg:p-0 lg:shadow-none">
          {saved ? (
            <Button className="w-full" onClick={() => navigate(ROUTES.prediction)}>
              수익 예측으로 이동
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          ) : (
            <Button className="w-full" disabled={isSaving} type="submit">
              {isSaving ? '저장 중...' : '다음'}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          )}
        </div>
      </form>
    </PageContainer>
  );
}
