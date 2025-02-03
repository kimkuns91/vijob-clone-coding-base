import type { Meta, StoryObj } from '@storybook/react';
import JobDetail from './JobDetail';

const meta = {
  title: 'Components/JobDetail',
  component: JobDetail,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof JobDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    job: {
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
  },
};
