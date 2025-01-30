'use client';

/**
 * 일자리 목록 로딩 상태를 표시하는 스켈레톤 컴포넌트
 *
 * @todo
 * - 스켈레톤 전용 Lottie 애니메이션 파일 필요
 * - 현재는 임시로 기본 로딩 애니메이션 사용 중
 */

import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/lottie/vijob-loading.white.json';

const JobCardListSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-8">
      <div className="w-24 h-24">
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default JobCardListSkeleton;
