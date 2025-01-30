'use client';

import { IBusiness } from '@/interface';
import { useState } from 'react';

interface InfoCardProps {
  business: IBusiness;
  title: string;
  salary: number;
  category: string;
  period: string;
  workDays: string[];
  workTime: { start: string; end: string };
  location: string;
}

const InfoCard = ({
  business,
  title,
  salary,
  category,
  period,
  workDays,
  workTime,
  location,
}: InfoCardProps) => {
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: 'rgba(217, 217, 217, 0)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'border-box',
          backgroundImage:
            'linear-gradient(165deg, rgb(30, 126, 246), rgb(240, 97, 37), rgb(61, 167, 88), rgb(0, 0, 0))',
          transform: `rotateY(${isFlipped ? '0deg' : '-180deg'})`,
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="size-full bg-white p-[16px]">
          <div className="w-full flex flex-col">
            <div className="flex flex-col px-4 pt-5 gap-[30px]">
              {/* 기업 정보 섹션 */}
              <div className="flex flex-col w-full items-start gap-4 pt-0 pb-5 px-0 relative">
                <div className="flex items-start justify-between relative self-stretch w-full">
                  <div className="inline-flex items-center gap-[5px]">
                    <div
                      className="flex-shrink-0 size-5 bg-contain bg-no-repeat"
                      style={{ backgroundImage: "url('/icons/incognito.svg')" }}
                    />
                    <div className="text-headline1 whitespace-nowrap text-black">
                      기업 정보
                    </div>
                  </div>
                </div>
                {/* 기업 상세 정보 그리드 */}
                <div
                  className="w-full grid gap-x-5 gap-y-[10px]"
                  style={{ gridTemplateColumns: 'auto minmax(50%, 1fr)' }}
                >
                  <p className="font-semibold text-neutral-800 text-xs leading-4">
                    기업명
                  </p>
                  <p className="font-semibold text-neutral-800 text-xs leading-4 break-words">
                    {business.name}
                  </p>
                  <p className="font-semibold text-neutral-800 text-xs leading-4">
                    대표자명
                  </p>
                  <p className="font-semibold text-neutral-800 text-xs leading-4 break-words">
                    {business.ownerName}
                  </p>
                  <p className="font-semibold text-neutral-800 text-xs leading-4">
                    사원수
                  </p>
                  <p className="font-semibold text-neutral-800 text-xs leading-4">
                    {business.employeesCount}
                  </p>
                </div>
              </div>

              {/* 위치 정보 섹션 */}
              <div className="flex flex-col w-full items-start gap-5 pt-0 pb-5 px-0">
                <div className="w-full flex gap-[5px] items-start">
                  <div
                    className="flex-shrink-0 size-5 bg-contain bg-no-repeat"
                    style={{ backgroundImage: "url('/icons/map.svg')" }}
                  />
                  <div className="text-headline1 w-fit text-black whitespace-nowrap">
                    위치
                  </div>
                </div>
                <div className="flex flex-col w-full items-start gap-3">
                  <div className="flex justify-between w-full items-start gap-4">
                    <p className="text-[13px] tracking-[-0.26px] leading-[18px] font-semibold text-black break-keep">
                      {business.address.roadAddress}
                    </p>
                    <button className="px-3 py-2 rounded-md border border-[#d9d9d9] bg-white active:bg-neutral-50">
                      <div className="text-caption2 text-black whitespace-nowrap">
                        주소 복사
                      </div>
                    </button>
                  </div>
                  {/* 지도 영역 */}
                  <div className="w-full h-40 rounded-lg border border-neutral-300 overflow-hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 앞면 - 채용 정보 */}
      <div
        className="absolute w-full min-h-48 overflow-hidden rounded-[23px] transition-transform duration-700"
        style={{
          height: '346px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: 'rgba(217, 217, 217, 0)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'border-box',
          backgroundImage:
            'linear-gradient(165deg, rgb(30, 126, 246), rgb(240, 97, 37), rgb(61, 167, 88), rgb(0, 0, 0))',
          transform: `rotateY(${isFlipped ? '180deg' : '0deg'})`,
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="size-full bg-white p-[28px]">
          <div className="relative size-full bg-white">
            {/* 채용 정보 내용 */}
            <div className="flex flex-col w-full items-start gap-2.5">
              {/* 제목 및 급여 섹션 */}
              <div className="flex flex-col items-start gap-2.5 pb-5 w-full border-b border-[#e9e9e9]">
                <div className="font-bold text-black text-xl tracking-[-1.00px] leading-[26px]">
                  {title}
                </div>
                <div className="flex items-center justify-end w-full">
                  <p className="text-caption2 text-blue-500">
                    월급
                    <span className="ml-2 font-semibold text-black text-xl tracking-[-0.20px] leading-[26px]">
                      {salary.toLocaleString()} 원
                    </span>
                  </p>
                </div>
              </div>

              {/* 근무 조건 섹션 */}
              <div className="flex flex-col gap-4 pb-[15px] w-full border-b border-[#e9e9e9]">
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col w-full gap-1">
                    {/* 카테고리 */}
                    <div className="inline-flex items-start gap-2.5 py-[5px]">
                      <div
                        className="size-4 bg-contain bg-no-repeat"
                        style={{ backgroundImage: "url('/icons/star.svg')" }}
                      />
                      <div className="font-semibold text-neutral-800 text-[13px] tracking-[-0.26px] leading-4">
                        {category}
                      </div>
                    </div>
                    {/* 기간 */}
                    <div className="inline-flex items-start gap-2.5 py-[5px]">
                      <div
                        className="size-4 bg-contain bg-no-repeat"
                        style={{
                          backgroundImage: "url('/icons/calendar.svg')",
                        }}
                      />
                      <div className="font-semibold text-neutral-800 text-[13px] tracking-[-0.26px] leading-4">
                        {period}
                      </div>
                    </div>
                    {/* 근무 시간 */}
                    <div className="inline-flex items-start gap-2.5 py-[5px]">
                      <div
                        className="size-4 bg-contain bg-no-repeat"
                        style={{ backgroundImage: "url('/icons/clock.svg')" }}
                      />
                      <div className="font-semibold text-neutral-800 text-[13px] tracking-[-0.26px] leading-4">
                        <p>{workDays.join('/')}</p>
                        <p>
                          {workTime.start} ~ {workTime.end}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 회사명 및 태그 섹션 */}
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-start justify-between w-full">
                  <div className="font-semibold text-black text-[15px] tracking-[-0.75px] leading-[19.5px]">
                    {business.name}
                  </div>
                </div>
                <div className="flex flex-wrap gap-[5px]">
                  {/* 위치 태그 */}
                  <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#e9e9e9] rounded">
                    <div
                      className="flex-shrink-0 size-3 bg-contain bg-no-repeat"
                      style={{ backgroundImage: "url('/icons/pin.svg')" }}
                    />
                    <div className="text-caption2 text-[#555555] whitespace-nowrap">
                      {location}
                    </div>
                  </div>
                  {/* 카테고리 태그 */}
                  <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#e9e9e9] rounded">
                    <div
                      className="flex-shrink-0 size-3 bg-contain bg-no-repeat"
                      style={{ backgroundImage: "url('/icons/hash.svg')" }}
                    />
                    <div className="text-caption2 text-[#555555] whitespace-nowrap">
                      {category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[28px] bg-white bottom-0 w-full" />
      </div>
    </div>
  );
};

export default InfoCard;
