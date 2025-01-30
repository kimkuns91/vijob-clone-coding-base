'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { IJobCategory } from '@/interface';
import JobCategorySheet from './JobCategorySheet';
import { useFilterStore } from '@/store';

const OccupationSheet: FC<PropsWithChildren> = () => {
  const {
    jobCategory,
    setJobCategory,
    isOccupationSheetOpen,
    setIsOccupationSheetOpen,
  } = useFilterStore();

  const [tempCategories, setTempCategories] = useState<IJobCategory[] | null>(null);

  // 시트가 열릴 때마다 tempCategories 초기화
  useEffect(() => {
    if (isOccupationSheetOpen) {
      setTempCategories(jobCategory);
    }
  }, [isOccupationSheetOpen, jobCategory]);

  // bottom 시트만 렌더링
  if (!isOccupationSheetOpen) return null;

  const closeSheet = () => {
    setIsOccupationSheetOpen(false);
    setTempCategories(null);
  };

  const handleCategoryRemove = (categoryToRemove: IJobCategory) => {
    setTempCategories(
      tempCategories?.filter((cat) => cat.id !== categoryToRemove.id) ?? null
    );
  };

  const handleApply = () => {
    setJobCategory(tempCategories);
    closeSheet();
  };

  const handleReset = () => {
    setTempCategories(null);
  };

  return (
    <AnimatePresence>
      {isOccupationSheetOpen && (
        <div className="absolute inset-0 z-[30]">
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeSheet}
          />

          {/* 바텀시트 */}
          <motion.div
            className="fixed overflow-hidden bottom-0 flex flex-col h-4/5 w-full py-[20px] gap-[15px] max-w-[430px] rounded-t-lg bg-white"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex justify-between items-center px-[16px] h-[40px]">
              <div className="flex flex-row items-center gap-[5px]">
                <p className="text-heading1">직종 (최대 3개)</p>
              </div>
              <button className="size-[40px] flex justify-center items-center -mr-2">
                <div
                  className="w-6 h-6 bg-no-repeat bg-contain"
                  style={{ backgroundImage: 'url("/icons/close.48x48.png")' }}
                />
              </button>
            </div>
            <div className="relative overflow-hidden flex w-full h-full">
              <div className="w-full h-full flex flex-col divide-y divide-neutral-200">
                <div className="w-full h-full flex flex-row overflow-hidden pl-[16px] pr-[8px]">
                  <div className="relative w-full h-full">
                    <JobCategorySheet
                      categories={tempCategories}
                      setCategories={setTempCategories}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 w-full h-[54px] px-[16px] pt-[15px]">
                  <div className="flex-shrink-0 h-full flex justify-center items-start">
                    {!tempCategories || tempCategories?.length === 0 ? (
                      <div className="h-[38px] flex justify-center items-center gap-2">
                        <p className="text-sm">선택한 직종이 없습니다.</p>
                      </div>
                    ) : (
                      <div className="flex flex-row w-full items-center justify-start gap-2">
                        {tempCategories?.map((category) => (
                          <div
                            key={category.id}
                            className="flex justify-center items-center h-[33px] px-[12px] py-[8px] gap-2 rounded-full whitespace-nowrap cursor-pointer select-none text-black-500 active:bg-neutral-50 ring-1 ring-inset ring-neutral-100"
                            onClick={() => handleCategoryRemove(category)}
                          >
                            <p className="text-[12px] font-[500] leading-[17.4px] tracking-[-0.24px]">
                              {category.i18nNames.KO_KR}
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              data-slot="icon"
                              className="inline-block w-4 h-4"
                            >
                              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* 컨트롤러 버튼 */}
            <div className="flex flex-row px-[16px] gap-[10px]">
              <button
                type="button"
                onClick={handleReset}
                className="w-full px-[25px] py-[15px] rounded-lg cursor-pointer text-blue-600 border border-blue-500 active:bg-blue-100 disabled:border-neutral-200 disabled:text-neutral-200 disabled:hover:bg-neutral-50 disabled:active:bg-neutral-100"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="w-full px-[25px] py-[15px] rounded-lg bg-blue-500 text-white text-body1 disabled:bg-neutral-200 disabled:hover:bg-neutral-200 disabled:active:bg-neutral-200 cursor-pointer"
              >
                적용
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OccupationSheet;
