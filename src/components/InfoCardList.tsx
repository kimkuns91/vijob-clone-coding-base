'use client';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { IJob } from '@/interface';
import InfoCard from './InfoCard';
import LoadingSpinner from './LoadingSpinner';
import { useFilterStore } from '@/store';
import { useInView } from 'react-intersection-observer';
import { useInfiniteJobs } from '@/hooks/useInfiniteJobs';

interface InfoCardListProps {
  currentId: number;
}

const InfoCardList: React.FC<InfoCardListProps> = ({ currentId }) => {
  const router = useRouter();
  const { inView } = useInView();
  const params = useParams();
  const locale = params?.locale as string;

  const {
    search,
    selectedProvinces,
    selectedCity,
    jobCategory,
    isRecruitment,
  } = useFilterStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteJobs({
      search,
      provinceCode: selectedProvinces?.code,
      cityCode: selectedCity?.code,
      categoryIds: jobCategory?.map((cat) => cat.id),
      isRecruitment,
    });

  const jobs =
    data?.pages.reduce<IJob[]>((acc, page) => [...acc, ...page.jobs], []) || [];

  const [currentIndex, setCurrentIndex] = useState(() => {
    return jobs.findIndex((job: IJob) => job.id === currentId);
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (currentIndex >= jobs.length - 1 && hasNextPage) {
      fetchNextPage();
    }
  }, [currentIndex, jobs.length, hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return (
      <div
        className="relative w-full min-h-[370px] touch-pan-y overflow-hidden"
        style={{ height: '370px' }}
      >
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className="relative w-full min-h-[370px] touch-pan-y overflow-hidden"
        style={{ height: '370px' }}
      >
        <div className="w-full h-full flex justify-center items-center text-red-500">
          에러가 발생했습니다
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-[370px] touch-pan-y overflow-hidden"
      style={{ height: '370px' }}
    >
      <Swiper
        slidesPerView="auto"
        centeredSlides={true}
        spaceBetween={8}
        grabCursor={true}
        className="h-full px-[calc((100%-466px)/2)]"
        initialSlide={currentIndex}
        slideToClickedSlide={true}
        allowTouchMove={status === 'success'}
        onSlideChange={(swiper) => {
          const nextJob = jobs[swiper.activeIndex];
          if (nextJob) {
            setCurrentIndex(swiper.activeIndex);
            router.replace(`/${locale}/job/${nextJob.id}`, { scroll: false });
          }
        }}
      >
        {jobs.map((job: IJob) => (
          <SwiperSlide key={job.id} className="!w-[366px] h-full pt-[24px]">
            <InfoCard job={job} currentId={currentId} />
          </SwiperSlide>
        ))}
        {isFetchingNextPage && (
          <SwiperSlide className="!w-[366px] flex items-center justify-center" />
        )}
      </Swiper>
    </div>
  );
};

export default InfoCardList;
