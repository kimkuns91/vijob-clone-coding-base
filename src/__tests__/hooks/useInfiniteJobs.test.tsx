import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useInfiniteJobs } from '@/hooks/useInfiniteJobs';

// Mock fetch 함수
global.fetch = jest.fn();

describe('useInfiniteJobs', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient.clear();
    (global.fetch as jest.Mock).mockClear();
  });

  test('초기 데이터 로딩', async () => {
    // Given
    const mockResponse = {
      jobs: [
        {
          id: 1,
          i18nTitle: { KO_KR: '첫번째 채용공고' },
        },
      ],
      nextCursor: 'next_page_token',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // When
    const { result } = renderHook(
      () =>
        useInfiniteJobs({
          search: '',
          provinceCode: '41',
          cityCode: '41135',
          categoryIds: [1],
          isRecruitment: true,
        }),
      { wrapper }
    );

    // Then
    await waitFor(() => {
      expect(result.current.status).toBe('success');
      expect(result.current.data?.pages[0].jobs[0].id).toBe(1);
    });
  });

  test('필터 변경 시 데이터 갱신', async () => {
    // Given
    const mockResponse1 = {
      jobs: [{ id: 1, i18nTitle: { KO_KR: '첫번째 공고' } }],
      nextCursor: null,
    };
    const mockResponse2 = {
      jobs: [{ id: 2, i18nTitle: { KO_KR: '검색된 공고' } }],
      nextCursor: null,
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse2,
      });

    // When
    const { result, rerender } = renderHook(
      ({ search }) =>
        useInfiniteJobs({
          search,
          provinceCode: '41',
          cityCode: '41135',
          categoryIds: [1],
          isRecruitment: true,
        }),
      {
        wrapper,
        initialProps: { search: '' },
      }
    );

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    // 검색어 변경
    rerender({ search: '검색어' });

    // Then
    await waitFor(() => {
      expect(result.current.data?.pages[0].jobs[0].i18nTitle.KO_KR).toBe(
        '검색된 공고'
      );
    });
  });
});
