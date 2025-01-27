"use client";

import { getCategoryName, getLocationName } from "@/utils/job";

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
          page.jobs.map((job) => {
            const category = getCategoryName(job.categoryId, jobCategories);
            const location = getLocationName(job.business.address.roadAddress);
            return (
              <JobCard
                key={job.id}
                company={job.business.name}
                categories={category}
                workDays={job.workWeekDays.join("/")}
                workHours={`${job.startTime} ~ ${job.endTime}`}
                salary={`월급 ${job.payAmount.toLocaleString()} 원`}
                status={job.isClosed ? "채용시마감" : "상시채용"}
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
