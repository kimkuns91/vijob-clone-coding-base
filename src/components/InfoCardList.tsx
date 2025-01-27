"use client";

import { useEffect, useRef, useState } from "react";

import InfoCard from "./InfoCard";
import { generateDummyJobs } from "@/utils/dummyData";
import { useRouter } from "next/navigation";

const InfoCardList = ({ currentId }: { currentId: number }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const jobs = generateDummyJobs();

  // 현재 job의 인덱스 찾기
  useEffect(() => {
    const index = jobs.findIndex((job) => job.id === currentId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentId, jobs]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      // 50px 이상 스와이프했을 때
      if (diff > 0 && currentIndex < jobs.length - 1) {
        // 왼쪽으로 스와이프
        router.push(`/ko/job/${jobs[currentIndex + 1].id}`);
      } else if (diff < 0 && currentIndex > 0) {
        // 오른쪽으로 스와이프
        router.push(`/ko/job/${jobs[currentIndex - 1].id}`);
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  return (
    <div
      className="relative w-full min-h-48 touch-pan-y"
      style={{ height: "346px", transition: "height 0.1s ease-in-out" }}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute top-0 h-fit z-0 px-[5px]"
        style={{
          width: "366px",
          marginLeft: "calc(32px)",
          left: `${currentIndex * -366}px`,
          transition: "left 0.3s ease-out",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            className="absolute"
            style={{ left: `${jobs.indexOf(job) * 366}px` }}
          >
            <InfoCard
              business={job.business}
              title={job.i18nTitle.KO_KR}
              salary={job.payAmount}
              category="건설 · 현장"
              period="1개월 이상"
              workDays={job.workWeekDays}
              workTime={{ start: job.startTime, end: job.endTime }}
              location={job.address.roadAddress}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCardList;
