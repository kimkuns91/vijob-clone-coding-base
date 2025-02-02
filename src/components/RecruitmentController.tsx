'use client';

import { useFilterStore } from '@/store';
import { useTranslations } from 'next-intl';

const RecruitmentController = () => {
  const t = useTranslations('JobPage');
  const { isRecruitment, setIsRecruitment } = useFilterStore();

  if (!isRecruitment)
    return (
      <button
        className="flex-shrink-0 group relative flex flex-row-reverse justify-start items-center gap-1 px-4 py-2"
        onClick={() => setIsRecruitment(true)}
      >
        <div
          className="flex-shrink-0 size-4 bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(/icons/checkable-small.gray.svg)`,
          }}
        />
        <p className="text-sm line-clamp-1">{t('recruitment')}</p>
      </button>
    );
  return (
    <button
      className="flex-shrink-0 group relative flex flex-row-reverse justify-start items-center gap-1 px-4 py-2"
      onClick={() => setIsRecruitment(false)}
    >
      <div
        className="flex-shrink-0 size-4 bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(/icons/checked-small.blue.svg)`,
        }}
      />
      <p className="text-sm line-clamp-1">{t('recruitment')}</p>
    </button>
  );
};

export default RecruitmentController;
