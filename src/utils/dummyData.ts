import { IJob } from '@/interface';
import sampleJob from '@/data/job.sample.json';

export const generateDummyJobs = (count: number = 56): IJob[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...sampleJob,
    id: 100 + index, // id만 순차적으로 증가
  }));
};

// 56개의 고정된 더미 데이터 생성
const TOTAL_DUMMY_JOBS = generateDummyJobs(56);

// 특정 범위의 데이터만 반환하는 함수
export const getDummyJobs = (start: number, count: number = 8) => {
  return TOTAL_DUMMY_JOBS.slice(start, start + count);
};
// 특정 ID의 job을 찾는 함수
export const getJobById = (id: number): IJob | undefined => {
  return TOTAL_DUMMY_JOBS.find(job => job.id === id);
}; 