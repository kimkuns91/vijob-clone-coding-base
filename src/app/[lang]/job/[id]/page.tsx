import DetailBottomNav from "@/components/layout/DetailBottmNav";
import InfoCard from "@/components/InfoCard";
import { generateDummyJobs } from "@/utils/dummyData";
import { notFound } from "next/navigation";

interface JobDetailPageProps {
  params: {
    id: string;
    lang: string;
  };
  searchParams: {
    from?: string;
    author?: string;
    title?: string;
  };
}

export default function JobDetailPage({
  params,
  searchParams,
}: JobDetailPageProps) {
  const jobId = parseInt(params.id, 10);
  const allJobs = generateDummyJobs();
  const job = allJobs.find((job) => job.id === jobId);

  if (!job) {
    notFound();
  }

  const { from, author, title } = searchParams;
  console.log(from, author, title);

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="relative overflow-x-hidden overflow-y-auto scroll-smooth w-full h-full">
          <div className="w-full h-[56px]" />
          <div className="relative w-full flex flex-col pt-[24px]">
            {/* 무한 좌우 스크롤 카드 구현 해야 함. api router를 쓰는게 나은지 고민 필요, 현재 카드 목록 데이터 넣어놓음*/}
            <InfoCard
              business={job.business}
              title={job.i18nTitle[params.lang === "ko" ? "KO_KR" : "EN_US"]}
              salary={job.payAmount}
              category="건설 · 현장"
              period="1개월 이상"
              workDays={job.workWeekDays}
              workTime={{ start: job.startTime, end: job.endTime }}
              location={job.address.roadAddress}
            />
          </div>
        </div>
      </div>
      <DetailBottomNav />
    </>
  );
}
