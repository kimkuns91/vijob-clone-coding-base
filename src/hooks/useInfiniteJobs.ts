import jobSample from "@/data/job.sample.json";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Job {
  id: number;
  payAmount: number;
  startTime: string;
  endTime: string;
  categoryId: number;
  workWeekDays: string[];
  isClosed: boolean;
  business: {
    name: string;
    address: {
      roadAddress: string;
    };
  };
}

interface JobsResponse {
  jobs: Job[];
  nextCursor: number | null;
}

// 실제 API 호출을 시뮬레이션하는 함수
const fetchJobs = async (cursor: number = 0): Promise<JobsResponse> => {
  // API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 페이지당 8개의 데이터 생성
  const jobs = Array(8)
    .fill(jobSample)
    .map((job, index) => ({
      ...job,
      id: cursor * 8 + index + 1,
    }));

  // 50개 이상의 데이터는 로드하지 않도록 설정
  const nextCursor = cursor < 5 ? cursor + 1 : null;

  return {
    jobs,
    nextCursor,
  };
};

export const useInfiniteJobs = () => {
  return useInfiniteQuery<JobsResponse>({
    queryKey: ["jobs"],
    queryFn: ({ pageParam = 0 }) => fetchJobs(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
