"use client";

import JobCard from "@/components/JobCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import jobCategories from "@/data/job-categories.json";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteJobs } from "@/hooks/useInfiniteJobs";

const JobCardList = () => {
  const { ref: loadMoreRef, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteJobs();

  // 카테고리 ID로 카테고리명을 찾는 함수
  const getCategoryName = (categoryId?: number) => {
    if (!categoryId) return "";
    return (
      jobCategories.find((category) => category.id === categoryId)?.i18nNames
        .KO_KR || ""
    );
  };

  // 주소에서 동/읍/면만 추출하는 함수
  const getLocationName = (address: string) => {
    const matches = address.match(/[가-힣]+(동|읍|면)$/);
    return matches ? matches[0] : address;
  };

  // 무한 스크롤 구현
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <div>로딩중...</div>;
  if (status === "error") return <div>에러가 발생했습니다</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        {data.pages.map((page) =>
          page.jobs.map((job) => (
            <JobCard
              key={job.id}
              company={job.business.name}
              categories={getCategoryName(job.categoryId)}
              workDays={job.workWeekDays.join("/")}
              workHours={`${job.startTime} ~ ${job.endTime}`}
              salary={`월급 ${job.payAmount.toLocaleString()} 원`}
              status={job.isClosed ? "채용시마감" : "상시채용"}
              location={getLocationName(job.business.address.roadAddress)}
            />
          ))
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
