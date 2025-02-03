'use client';

import { getCategoryName, getLocationName } from '@/utils/job';

import JobCard from '@/components/JobCard';
import JobCardListSkeleton from './JobCardListSkeleton';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoJobList from './NoJobList';
import jobCategories from '@/data/job-categories.json';
import { useEffect } from 'react';
import { useFilterStore } from '@/store';
import { useInView } from 'react-intersection-observer';
import { useInfiniteJobs } from '@/hooks/useInfiniteJobs';
import { useTranslations } from 'next-intl';

const JobCardList = () => {
  const t = useTranslations('JobPage');
  const { ref: loadMoreRef, inView } = useInView();
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
  // 무한 스크롤 구현
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') return <JobCardListSkeleton />;
  if (status === 'error') return <div>에러가 발생했습니다</div>;

  // 모든 페이지의 jobs 배열이 비어있는지 확인
  const hasNoJobs = data.pages.every((page) => page.jobs.length === 0);
  if (hasNoJobs) return <NoJobList />;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        {data.pages.map((page) =>
          page.jobs.map((job) => {
            const category = getCategoryName(job.categoryId, jobCategories);
            const location = getLocationName(job.business.address.roadAddress);
            return (
              <JobCard
                key={job.id}
                company={job.business.name}
                categories={category}
                workDays={job.workWeekDays.join('/')}
                workHours={`${job.startTime} ~ ${job.endTime}`}
                salary={t('salary', { amount: job.payAmount.toLocaleString() })}
                status={
                  job.isClosed
                    ? t('closingOfRecruitment')
                    : t('fullTimeEmployment')
                }
                location={location}
              />
            );
          })
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div
        ref={loadMoreRef}
        className="flex flex-col justify-between items-center p-8 mb-8"
      >
        {isFetchingNextPage && <LoadingSpinner />}
        {!hasNextPage && (
          <div className="text-sm text-gray-400">마지막 일자리입니다.</div>
        )}
      </div>
    </div>
  );
};

export default JobCardList;
