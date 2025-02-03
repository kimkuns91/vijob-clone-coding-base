'use client';

import { useDateFormat, useDeadlineText } from '@/hooks/useDateFormat';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import DetailSession from './DetailSession';
import { IJob } from '@/interface';
import LoadingSpinner from './LoadingSpinner';
import PreferSection from './PreferSection';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';

// NaverMap을 dynamic import로 변경
const DynamicNaverMap = dynamic(() => import('./NaverMap'), {
  ssr: false,
});

interface JobDetailProps {
  currentId: number;
  lang: string;
}

const JobDetail: React.FC<JobDetailProps> = ({ currentId, lang }) => {
  const t = useTranslations('JobDetailPage');
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<IJob | null>(null);
  const { dateFormat, dateLocale } = useDateFormat(locale);
  const deadlineText = useDeadlineText(job, t);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/job/${currentId}?lang=${lang}`);
        const job = await response.json();
        setJob(job);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [currentId, lang]);

  if (!job) return null;

  const sections = [
    {
      title: t('prefer'),
      icon: '/icons/favorite.svg',
      children: <PreferSection t={t} />,
      modalButton: true,
      modalButtonText: t('viewMore'),
      modalButtonOnClick: () => {},
    },
    {
      title: t('provide'),
      icon: '/icons/favorite.svg',
      children: (
        <div className="relative w-full h-fit">
          <div className="relative w-full h-full">
            <div className="overflow-scroll flex w-full items-stretch justify-start relative gap-[5px] pb-4 overflow-x-auto overflow-y-hidden">
              <div className="flex-shrink-0 flex flex-col w-[110px] items-start gap-2.5 pt-2 pb-[15px] px-2 relative bg-white rounded-[10px] border border-solid border-[#e9e9e9]">
                <div className="flex-col h-[70px] items-center justify-center gap-1 px-[15px] py-2.5 bg-[#f2f4f6] rounded-lg flex relative self-stretch w-full">
                  <div
                    className="flex-shrink-0 size-10 bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: 'url("/icons/provided-insurance.svg")',
                    }}
                  ></div>
                </div>
                <div className="items-start gap-2.5 flex-[0_0_auto] flex relative self-stretch w-full">
                  <div className="relative flex-1 text-caption3 text-black text-center">
                    {t('insurance')}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col w-[110px] items-start gap-2.5 pt-2 pb-[15px] px-2 relative bg-white rounded-[10px] border border-solid border-[#e9e9e9]">
                <div className="flex-col h-[70px] items-center justify-center gap-1 px-[15px] py-2.5 bg-[#f2f4f6] rounded-lg flex relative self-stretch w-full">
                  <div
                    className="flex-shrink-0 size-10 bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: 'url("/icons/provided-bonus.svg")',
                    }}
                  ></div>
                </div>
                <div className="items-start gap-2.5 flex-[0_0_auto] flex relative self-stretch w-full">
                  <div className="relative flex-1 text-caption3 text-black text-center">
                    {t('bonus')}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute bg-gradient-to-l vijob-from-color to-transparent top-0 right-0 w-6 h-full transition-opacity duration-300 pointer-events-none opacity-0"></div>
              <div className="absolute bg-gradient-to-r vijob-from-color to-transparent top-0 left-0 w-6 h-full transition-opacity duration-300 pointer-events-none opacity-0"></div>
              <div className="absolute bg-gradient-to-t vijob-from-color to-transparent bottom-0 left-0 h-6 w-full transition-opacity duration-300 pointer-events-none opacity-0"></div>
              <div className="absolute bg-gradient-to-b vijob-from-color to-transparent top-0 left-0 h-6 w-full transition-opacity duration-300 pointer-events-none opacity-0"></div>
            </div>
          </div>
        </div>
      ),
      modalButton: true,
      modalButtonText: t('viewMore'),
      modalButtonOnClick: () => {},
    },
    {
      title: t('location'),
      icon: '/icons/map.svg',
      children: (
        <div className="flex flex-col w-full items-start gap-3 relative flex-[0_0_auto]">
          <div className="flex justify-between self-stretch w-full items-start relative flex-[0_0_auto] gap-4">
            <p className="text-[13px] tracking-[-0.26px] leading-[18px] relative w-fit font-semibold text-black break-keep">
              {job.business.address.roadAddress}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(job.business.address.roadAddress);
              }}
              className="all-[unset] box-border inline-flex items-center justify-center gap-1 px-3 py-2 relative flex-[0_0_auto] rounded-md border border-solid border-[#d9d9d9] bg-white active:bg-neutral-50"
            >
              <div className="relative w-fit text-caption2 text-black whitespace-nowrap">
                주소 복사
              </div>
            </button>
          </div>
          <DynamicNaverMap location={job.business.address.location} />
        </div>
      ),
    },
    {
      title: t('details'),
      icon: '/icons/incognito.svg',
      children: (
        <div className="flex w-full items-center justify-start relative gap-4 overflow-auto">
          <div className="w-full bg-neutral-50 rounded-lg p-[10px]">
            <p className="text-neutral-800 text-[13px] leading-[18px] font-normal break-words whitespace-pre-wrap">
              {t('exampleDetail')}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t('period'),
      icon: '/icons/watch.svg',
      children: (
        <div
          className="w-full grid gap-x-5 gap-y-[10px]"
          style={{ gridTemplateColumns: 'auto 1fr' }}
        >
          <p className="max-w-32 relative w-fit font-semibold text-neutral-800 text-xs tracking-[0] leading-4 whitespace-nowrap">
            {t('registerDate')}
          </p>
          <p className="relative w-fit font-semibold text-neutral-800 text-xs tracking-[0] leading-4 whitespace-nowrap">
            {format(job.startDate, dateFormat, { locale: dateLocale })}
          </p>
          <p className="max-w-32 relative w-fit font-semibold text-neutral-800 text-xs tracking-[0] leading-4 whitespace-nowrap">
            {t('deadline')}
          </p>
          <p className="relative w-fit font-semibold text-neutral-800 text-xs tracking-[0] leading-4 whitespace-nowrap">
            {deadlineText}
          </p>
        </div>
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-[30px]">
      {sections.map((section, index) => (
        <DetailSession
          key={index}
          title={section.title}
          icon={section.icon}
          modalButton={section.modalButton}
          modalButtonText={section.modalButtonText}
          modalButtonOnClick={section.modalButtonOnClick}
        >
          {section.children}
        </DetailSession>
      ))}
    </div>
  );
};

export default JobDetail;
