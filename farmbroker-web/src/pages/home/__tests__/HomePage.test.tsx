import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';
import { HomePage } from '@/pages/home/HomePage';
import { roleCards } from '@/pages/home/constants/homeContent';

describe('HomePage', () => {
  it('온보딩 문구와 역할 상수를 렌더링한다', () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: /비어 있는 공간을 도심 스마트팜으로 바꾸세요/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /시작하기/i })).toBeInTheDocument();

    roleCards.forEach((role) => {
      expect(screen.getByText(role.label)).toBeInTheDocument();
    });
  });
});
