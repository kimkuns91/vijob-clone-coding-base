import * as dummyData from '@/utils/dummyData';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useInfiniteJobs } from '@/hooks/useInfiniteJobs';

// getDummyJobs 함수를 모킹
jest.mock('@/utils/dummyData', () => ({
  getDummyJobs: jest.fn(),
}));

describe('useInfiniteJobs', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test('초기 데이터 로딩', async () => {
    const mockJobs = [
      {
        id: 1,
        payAmount: 10000,
        startDate: '2025-02-01',
        endDate: '2025-08-31',
        startTime: '09:00',
        endTime: '18:00',
        categoryId: 2002,
        workWeekDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        isClosed: false,
        business: {
          id: 30,
          name: '비잡',
          ownerName: '김비잡',
          employeesCount: 9,
          location: { latitude: 37.123, longitude: 127.123 },
          email: 'test@test.com',
          establishedDate: '2024-01-01',
          websiteUrl: 'https://test.com',
          address: {
            zipCode: null,
            provinceCode: '41',
            cityCode: '41135',
            location: { latitude: 37.123, longitude: 127.123 },
            roadAddress: '테스트 주소',
            jibunAddress: '테스트 주소',
            addressDetail: '테스트',
          },
        },
        i18nTitle: { KO_KR: '첫번째 채용공고', EN_US: 'First Job' },
        i18nDescription: { KO_KR: '설명', EN_US: 'Description' },
        location: { latitude: 37.123, longitude: 127.123 },
        address: {
          zipCode: '12345',
          provinceCode: '41',
          cityCode: '41135',
          location: { latitude: 37.123, longitude: 127.123 },
          roadAddress: '테스트 주소',
          jibunAddress: '테스트 주소',
          addressDetail: '테스트',
        },
      },
    ];

    (dummyData.getDummyJobs as jest.Mock).mockReturnValue(mockJobs);

    // When
    const { result } = renderHook(
      () =>
        useInfiniteJobs({
          search: '',
          provinceCode: '41',
          cityCode: '41135',
          categoryIds: [2002],
          isRecruitment: true,
        }),
      { wrapper }
    );

    // Then
    await waitFor(
      () => {
        expect(result.current.status).toBe('success');
        expect(result.current.data?.pages[0].jobs[0].id).toBe(1);
      },
      { timeout: 3000 }
    );
  });

  test('필터 변경 시 데이터 갱신', async () => {
    // Given
    const mockJobs = [
      {
        id: 100,
        payAmount: 10000,
        startDate: '2025-02-01',
        endDate: '2025-08-31',
        startTime: '09:00',
        endTime: '18:00',
        categoryId: 2002,
        workWeekDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        isClosed: false,
        business: {
          id: 30,
          name: '비잡',
          ownerName: '김비잡',
          employeesCount: 9,
          location: {
            latitude: 37.3898680691971,
            longitude: 127.09878136729,
          },
          email: 'service@vijob.net',
          establishedDate: '2024-04-29',
          websiteUrl: 'https://www.vijob.net',
          address: {
            zipCode: null,
            provinceCode: '41',
            cityCode: '41135',
            location: {
              latitude: 37.3898680691971,
              longitude: 127.09878136729,
            },
            roadAddress: '경기도 성남시 분당구 판교동',
            jibunAddress: '경기도 성남시 분당구 판교동',
            addressDetail: '로비층',
          },
        },
        i18nDescription: {
          EN_US: 'Hello?\nWe are recruiting Global Marketers\nThanks.',
          KO_KR: '안녕하세요?\n글로벌 마케터 모집합니다.\n감사합니다.',
        },
        i18nTitle: {
          EN_US: 'Recruiting Global Marketers',
          KO_KR: '글로벌 마케터 모집합니다',
        },
        location: {
          latitude: 36.6374299776839,
          longitude: 127.459790156115,
        },
        address: {
          zipCode: '28562',
          provinceCode: '43',
          cityCode: '43112',
          location: {
            latitude: 36.6374299776839,
            longitude: 127.459790156115,
          },
          roadAddress: '충북 청주시 서원구 1순환로 627',
          jibunAddress: '충북 청주시 서원구 사창동 180-1',
          addressDetail: '금강산추어탕',
        },
      },
    ];

    // getDummyJobs가 호출될 때마다 mockJobs를 반환하도록 설정
    (dummyData.getDummyJobs as jest.Mock).mockReturnValue(mockJobs);

    // When
    const { result, rerender } = renderHook(
      ({ search }) =>
        useInfiniteJobs({
          search,
          provinceCode: '41',
          cityCode: '41135',
          categoryIds: [2002], // mockJob의 categoryId와 일치하도록 수정
          isRecruitment: true,
        }),
      {
        wrapper,
        initialProps: { search: '' },
      }
    );

    // Then
    await waitFor(
      () => {
        expect(result.current.status).toBe('success');
      },
      { timeout: 3000 }
    );

    // 검색어로 필터링
    rerender({ search: '글로벌' });  // mockJob의 제목에 포함된 텍스트로 검색

    await waitFor(
      () => {
        expect(result.current.data?.pages[0].jobs[0].i18nTitle.KO_KR).toBe(
          '글로벌 마케터 모집합니다'
        );
      },
      { timeout: 3000 }
    );
  });
});
