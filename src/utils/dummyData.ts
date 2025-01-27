import { IJob } from "@/interface";
import sampleJob from "@/data/job.sample.json";

export const generateDummyJobs = (count: number = 56): IJob[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...sampleJob,
    id: 100 + index, // id만 순차적으로 증가
  }));
};
