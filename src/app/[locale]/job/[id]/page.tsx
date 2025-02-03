import DetailBottomNav from '@/components/layout/DetailBottmNav';
import DynamicInfoCardList from '@/components/DynamicInfoCardList';
import JobDetail from '@/components/JobDetail';
import { getJobById } from '@/utils/dummyData';
import { notFound } from 'next/navigation';

interface JobDetailPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id, locale } = await params;
  const jobId = parseInt(id, 10);
  const currentJob = await getJobById(jobId);

  if (!currentJob) {
    notFound();
  }

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="relative overflow-x-hidden overflow-y-auto scroll-smooth w-full h-full">
          <div className="w-full h-[56px]" />
          <div className="relative w-full flex flex-col">
            <DynamicInfoCardList currentId={jobId} />
          </div>
          <div className="flex flex-col px-4 py-[30px] gap-[30px] mb-16">
            <JobDetail currentId={jobId} lang={locale} />
          </div>
        </div>
      </div>
      <DetailBottomNav />
    </>
  );
}
