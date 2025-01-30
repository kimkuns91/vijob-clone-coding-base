'use client';

/**
 * 오늘 등록된 전국 일자리 수를 표시하는 컴포넌트
 *
 * @todo
 * - DB 연동 후 오늘 등록된 일자리 수를 가져오는 API 연동 필요
 * - 현재는 10-100 사이의 랜덤 숫자 표시
 */

import { useEffect, useState } from 'react';

const CountRecentJob = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 10부터 100 사이의 랜덤 숫자 생성
    const randomCount = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    setCount(randomCount);
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <p className="text-sm text-neutral-600">
      오늘 새로 등록된 일자리 전국{' '}
      <span className="text-blue-500 font-semibold">{count}</span> 건
    </p>
  );
};

export default CountRecentJob;
