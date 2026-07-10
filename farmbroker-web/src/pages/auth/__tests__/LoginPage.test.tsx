import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';
import { LoginPage } from '@/pages/auth/LoginPage';

describe('LoginPage', () => {
  it('역할 카드와 로그인 폼을 렌더링한다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    expect(screen.getByText('공간 제공자')).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/i)).toHaveValue('owner@example.com');

    await user.click(screen.getByText('도심 농부'));
    expect(screen.getByText('도심 농부')).toBeInTheDocument();
  });
});
