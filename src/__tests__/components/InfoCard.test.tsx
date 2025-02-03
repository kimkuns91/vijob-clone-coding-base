import { fireEvent, render, screen } from '@testing-library/react';

import { IJob } from '@/interface';
import InfoCard from '@/components/InfoCard';

// NaverMap 컴포넌트 모킹
jest.mock('@/components/NaverMap', () => {
  return function DummyMap() {
    return <div data-testid="naver-map">Naver Map</div>;
  };
});

describe('InfoCard', () => {
  const mockJob: IJob = {
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
  } as IJob;

  test('카드 클릭 시 앞면/뒷면 전환', () => {
    // Given
    render(<InfoCard job={mockJob} currentId={1} />);

    // When - 카드 클릭
    const card = screen.getByText('테스트 채용공고');
    fireEvent.click(card);

    // Then - 뒷면의 기업정보가 보여야 함
    expect(screen.getByText('기업 정보')).toBeInTheDocument();
    expect(screen.getByText('테스트 회사')).toBeInTheDocument();
  });

  test('현재 선택된 카드는 강조 스타일 적용', () => {
    // Given - 현재 선택된 카드로 렌더링
    const { container } = render(<InfoCard job={mockJob} currentId={1} />);

    // When
    const cardFront = container.querySelector('[style*="linear-gradient"]');

    // Then - 강조 스타일이 적용되어 있어야 함
    expect(cardFront).toBeInTheDocument();
  });

  test('주소 복사 버튼 클릭 시 클립보드에 주소 복사', () => {
    // Given
    const mockClipboard = {
      writeText: jest.fn(),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    render(<InfoCard job={mockJob} currentId={1} />);

    // When - 카드를 뒤집고 주소 복사 버튼 클릭
    fireEvent.click(screen.getByText('테스트 채용공고'));
    fireEvent.click(screen.getByText('주소 복사'));

    // Then - 클립보드에 주소가 복사되어야 함
    expect(mockClipboard.writeText).toHaveBeenCalledWith('서울시 강남구');
  });
});
