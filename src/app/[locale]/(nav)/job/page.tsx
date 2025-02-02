import CountRecentJob from '@/components/CountRecentJob';
import Header from '@/components/layout/Header';
import JobCardList from '@/components/JobCardList';
import RecruitmentController from '@/components/RecruitmentController';
import { useTranslations } from 'next-intl';

export default function JobPage() {
  const t = useTranslations('JobPage');
  console.log(t('title'));

  return (
    <>
      <Header />
      <div className="relative h-[calc(100vh-56px)] overflow-hidden bg-[#F7F7FA]">
        <div className="bg-bg-transparent h-full">
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="relative w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar"
              style={{ overscrollBehavior: 'none' }}
            >
              <div style={{ width: '100%', height: '216px' }} />
              <div className="w-full flex flex-col justify-between items-start mt-[8px] mb-[20px]">
                {/* 채용 중 컨트롤러 */}
                <div className="w-full flex justify-between items-start">
                  <div className="flex flex-row items-center gap-[5px] overflow-hidden">
                    <div
                      className="flex-shrink-0 ml-4 w-[80px] h-[48px] bg-center bg-no-repeat bg-contain"
                      style={{
                        backgroundImage: `url(/images/foreeder-desk.blue.svg)`,
                      }}
                    />
                    <p className="text-black text-base font-semibold tracking-[-0.32px] leading-5 line-clamp-1">
                      {t('greeting')}
                    </p>
                  </div>
                  <RecruitmentController />
                </div>
                {/* 새로 등록된 일자리 */}
                <div className="w-full px-4 pt-4">
                  <div className="w-full px-4 py-1.5 rounded-lg bg-white">
                    <div
                      className="relative max-w-full"
                      style={{
                        maskSize: '200% 100%',
                        maskPosition: '-24px center',
                        transition: 'mask-position 0.4s',
                      }}
                    >
                      <div
                        className="relative overflow-hidden flex w-full items-center"
                        style={{
                          maskSize: '200% 100%',
                          maskPosition: '100% center',
                        }}
                      >
                        <div
                          className="relative left-0 whitespace-nowrap pr-4"
                          style={{ transform: 'translateX(0px)' }}
                        >
                          {/* 오늘 새로 등록된 일자리 전국 */}
                          <CountRecentJob />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pt-1">
                <JobCardList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
