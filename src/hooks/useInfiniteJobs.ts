import { IJob } from '@/interface';
import jobSample from '@/data/job.sample.json';
import { useInfiniteQuery } from '@tanstack/react-query';

interface JobsResponse {
  jobs: IJob[];
  nextCursor: number | null;
}

interface JobsQueryParams {
  search?: string | null;
  provinceCode?: string;
  cityCode?: string;
  categoryIds?: number[];
  isRecruitment?: boolean;
}

// 실제 API 호출을 시뮬레이션하는 함수
const fetchJobs = async (
  cursor: number = 0,
  params: JobsQueryParams
): Promise<JobsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log(params);
  let filteredJobs = Array(8)
    .fill(jobSample)
    .map((job, index) => ({
      ...job,
      id: cursor * 8 + index + 1,
    }));

  // 필터 적용
  if (params.search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.i18nTitle.KO_KR.includes(params.search!) ||
        job.business.name.includes(params.search!)
    );
  }

  if (params.provinceCode) {
    filteredJobs = filteredJobs.filter(
      (job) => job.business.address.provinceCode === params.provinceCode
    );
  }

  if (params.cityCode) {
    filteredJobs = filteredJobs.filter(
      (job) => job.business.address.cityCode === params.cityCode
    );
  }

  if (params.categoryIds?.length) {
    filteredJobs = filteredJobs.filter((job) =>
      params.categoryIds!.includes(job.categoryId)
    );
  }

  if (typeof params.isRecruitment === 'boolean') {
    filteredJobs = filteredJobs.filter(
      (job) => job.isClosed === !params.isRecruitment
    );
  }

  const nextCursor = cursor < 5 && filteredJobs.length > 0 ? cursor + 1 : null;

  return {
    jobs: filteredJobs,
    nextCursor,
  };
};

export const useInfiniteJobs = (params: JobsQueryParams = {}) => {
  return useInfiniteQuery<JobsResponse>({
    queryKey: ['jobs', params], // params를 queryKey에 포함
    queryFn: ({ pageParam = 0 }) => fetchJobs(pageParam as number, params),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
