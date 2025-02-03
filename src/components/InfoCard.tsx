import { IJob } from '@/interface';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const DynamicNaverMap = dynamic(() => import('./NaverMap'), {
  ssr: false,
});
interface InfoCardProps {
  job: IJob;
  currentId: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ job, currentId }) => {
  const isActive = currentId === job.id;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: '732px', perspectiveOrigin: 'center 96px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* 뒷면 - 회사 정보 */}
      <div
        className="absolute w-full min-h-48 overflow-hidden rounded-[23px] transition-transform duration-700"
        style={{
          height: '346px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px',
          transform: `rotateY(${isFlipped ? '0deg' : '-180deg'})`,
          backfaceVisibility: 'hidden',
          ...(isActive && {
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: 'rgba(217, 217, 217, 0)',
            backgroundImage:
              'linear-gradient(165deg, rgb(30, 126, 246), rgb(240, 97, 37), rgb(61, 167, 88), rgb(0, 0, 0))',
            backgroundOrigin: 'border-box',
            backgroundClip: 'border-box',
          }),
        }}
      >
        <div className="size-full bg-white p-7">
          {/* 기업 정보 섹션 */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div
                className="size-5 bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/icons/incognito.svg')" }}
              />
              <h3 className="text-headline1 text-black">기업 정보</h3>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5">
              <p className="font-semibold text-neutral-800 text-xs leading-4">
                기업명
              </p>
              <p className="font-semibold text-neutral-800 text-xs leading-4 break-words">
                {job.business.name}
              </p>
              <p className="font-semibold text-neutral-800 text-xs leading-4">
                기업형태
              </p>
              <p className="font-semibold text-neutral-800 text-xs leading-4 break-words">
                중견기업
              </p>
              <p className="font-semibold text-neutral-800 text-xs leading-4">
                주요사업분야
              </p>
              <p className="font-semibold text-neutral-800 text-xs leading-4">
                생산 · 제조
              </p>
            </div>
            <div className="flex flex-col w-full items-start gap-3 relative flex-[0_0_auto]">
              <div className="flex justify-between self-stretch w-full items-start relative flex-[0_0_auto] gap-4">
                <p className="text-[13px] tracking-[-0.26px] leading-[18px] relative w-fit font-semibold text-black break-keep">
                  {job.business.address.roadAddress}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      job.business.address.roadAddress
                    );
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
          </div>
        </div>
      </div>

      {/* 앞면 - 채용 정보 */}
      <div
        className="absolute w-full min-h-48 overflow-hidden rounded-[23px] transition-transform duration-700"
        style={{
          height: '346px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px',
          transform: `rotateY(${isFlipped ? '180deg' : '0deg'})`,
          backfaceVisibility: 'hidden',
          ...(isActive && {
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: 'rgba(217, 217, 217, 0)',
            backgroundImage:
              'linear-gradient(165deg, rgb(30, 126, 246), rgb(240, 97, 37), rgb(61, 167, 88), rgb(0, 0, 0))',
            backgroundOrigin: 'border-box',
            backgroundClip: 'border-box',
          }),
        }}
      >
        <div className="size-full bg-white p-7">
          {/* 제목과 시급 정보 */}
          <div className="flex flex-col gap-2.5 pb-5 border-b border-[#e9e9e9]">
            <h2 className="font-bold text-xl tracking-[-1px] leading-[26px]">
              {job.i18nTitle.KO_KR}
            </h2>
            <p className="flex justify-end items-center">
              <span className="text-caption2 text-blue-500">시급</span>
              <span className="ml-2 font-semibold text-xl tracking-[-0.2px] leading-[26px]">
                {job.payAmount.toLocaleString()} 원
              </span>
            </p>
          </div>

          {/* 근무 정보 */}
          <div className="flex flex-col gap-4 py-4 border-b border-[#e9e9e9]">
            <div className="space-y-2.5">
              {[
                { icon: 'star', text: '주방보조' },
                { icon: 'calendar', text: '1개월 이상' },
                { icon: 'clock', text: '일/금/토 18:00 ~ 01:00' },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-center gap-2.5 py-[5px]">
                  <div
                    className="size-4 bg-contain bg-no-repeat"
                    style={{ backgroundImage: `url("/icons/${icon}.svg")` }}
                  />
                  <span className="font-semibold text-neutral-800 text-[13px] tracking-[-0.26px] leading-4">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 회사 정보와 태그 */}
          <div className="flex flex-col gap-2.5 pt-4">
            <h3 className="font-semibold text-[15px] tracking-[-0.75px]">
              지코바양념치킨
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {['월곡동', '식음료'].map((tag, index) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#e9e9e9] rounded"
                >
                  <div
                    className="size-3 bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: `url("/icons/${
                        index === 0 ? 'pin' : 'hash'
                      }.svg")`,
                    }}
                  />
                  <span className="text-caption2 text-[#555555]">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute h-7 bg-white bottom-0 w-full" />
      </div>
    </div>
  );
};

export default InfoCard;
