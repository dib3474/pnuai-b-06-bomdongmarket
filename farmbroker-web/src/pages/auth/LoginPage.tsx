import { ArrowRight, Lock, Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { PageContainer } from '@/components/layout/PageContainer';
import { ROUTES } from '@/constants/routes';
import type { UserRole } from '@/types/api';
import { RoleSelectionCards } from '@/pages/auth/components/RoleSelectionCards';

// mock 로그인 화면입니다. 역할 선택과 이메일 로그인을 한 흐름으로 시연합니다.
export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('OWNER');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate(ROUTES.dashboard);
    }, 250);
  }

  return (
    <PageContainer narrow>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-soil-500">
            역할 선택
          </p>
          <h1 className="mt-2 text-3xl font-black text-ink-900">
            선택한 역할에 따라 봄동마켓 사용 흐름이 달라집니다.
          </h1>
          <div className="mt-6">
            <RoleSelectionCards onChange={setRole} value={role} />
          </div>
        </div>

        <Card className="p-5">
          <h2 className="text-2xl font-black text-ink-900">로그인</h2>
          <p className="mt-2 text-sm text-slate-600">
            데모 계정으로 로그인하거나 소셜 로그인 흐름을 확인할 수 있습니다.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button variant="outline">Google로 계속하기</Button>
            <Button variant="outline">카카오로 계속하기</Button>
          </div>
          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <Input
              defaultValue="owner@example.com"
              icon={<Mail className="h-4 w-4" aria-hidden />}
              label="이메일"
              name="email"
              type="email"
            />
            <Input
              defaultValue="12345678"
              icon={<Lock className="h-4 w-4" aria-hidden />}
              label="비밀번호"
              minLength={8}
              name="password"
              type="password"
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? '로그인 중...' : '로그인'}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-600">
            봄동마켓이 처음이신가요?{' '}
            <button className="font-bold text-leaf-700" type="button">
              회원가입
            </button>
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}
