'use client';

import HeaderController from './HeaderController';
import SearchController from './SearchController';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const Header = () => {
  const t = useTranslations('JobPage');
  const [isOpen, setIsOpen] = useState(false);
  const {
    search,
    jobCategory,
    setIsOccupationSheetOpen,
    clearSearch,
    clearJobCategory,
  } = useFilterStore();

  const handleReset = () => {
    clearSearch();
    clearJobCategory();
  };

  const handleOpenOccupationSheet = () => {
    setIsOccupationSheetOpen(true);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bg-opacity-80 backdrop-blur-[20px] z-[20]">
      {!isOpen ? (
        <HeaderController setIsOpen={setIsOpen} />
      ) : (
        <SearchController setIsOpen={setIsOpen} />
      )}
      <div className="relative">
        {/* GS25 배너 */}
        <div className="relative size-full h-[100px] px-4 py-[10px]">
          <div
            className="relative w-full h-full rounded-[10px] overflow-hidden"
            style={{ boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)' }}
          >
            <div className="relative flex flex-col justify-between items-center w-full h-full p-[20px] bg-brand-gs25 cursor-pointer">
              <div className="flex justify-between items-center gap-[15px] self-stretch h-full">
                <div
                  className="flex-shrink-0 w-[70.83px] h-[25px] bg-contain bg-right bg-no-repeat"
                  style={{ backgroundImage: `url(/banners/banner_gs25.png)` }}
                />
                <span className="text-white font-[600] text-[14px] leading-[16.8px]">
                  {t('gs25')}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 검색 영역 */}
        <div className="h-[60px] bg-transparent">
          <div className="flex-shrink-0 w-full flex flex-col pt-2 pb-4 gap-2">
            <ul className="flex-shrink-0 w-full flex flex-row overflow-x-auto px-4 gap-[6px]">
              <li className="flex-shrink-0">
                <div
                  onClick={handleReset}
                  className="flex-shrink-0 rounded-full px-[15px] py-[8px] flex justify-center items-center cursor-pointer select-none 
                  bg-white active:bg-neutral-50 ring-1 ring-inset ring-neutral-100"
                >
                  <div
                    className="relative flex flex-row justify-center items-center gap-[4px]"
                    onClick={handleReset}
                  >
                    <p className="text-[14px] text-neutral-800 font-bold leading-[18.9px] tracking-[-0.28px] capitalize">
                      {t('reset')}
                    </p>
                    <div
                      className="flex-shrink-0 size-[14px] bg-cover bg-center"
                      style={{
                        backgroundImage: `url(/icons/refresh.svg)`,
                        filter: 'none',
                      }}
                    />
                  </div>
                </div>
              </li>
              {search && (
                <li className="flex-shrink-0">
                  <div
                    onClick={() => clearSearch()}
                    className={cn(
                      'rounded-full px-[15px] py-[8px] flex justify-center items-center cursor-pointer select-none ring-1 ring-inset ring-neutral-100',
                      'bg-vijob-blue text-white'
                    )}
                  >
                    <button className="relative flex flex-row justify-center items-center gap-[4px]">
                      <p className="text-[14px] font-bold leading-[18.9px] tracking-[-0.28px] capitalize">
                        {search}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="flex-shrink-0 size-4"
                      >
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              )}
              <li className="flex-shrink-0">
                <div
                  onClick={handleOpenOccupationSheet}
                  className={cn(
                    'rounded-full px-[15px] py-[8px] flex justify-center items-center cursor-pointer select-none ring-1 ring-inset ring-neutral-100',
                    !jobCategory || jobCategory.length === 0
                      ? 'bg-white text-neutral-800'
                      : 'bg-vijob-blue text-white'
                  )}
                >
                  <button className="relative flex flex-row justify-center items-center gap-[4px]">
                    <p className="text-[14px] font-bold leading-[18.9px] tracking-[-0.28px] capitalize">
                      {!jobCategory || jobCategory.length === 0
                        ? t('jobCategory')
                        : jobCategory.length === 1
                        ? jobCategory[0].i18nNames.KO_KR
                        : `${jobCategory[0].i18nNames.KO_KR} +${
                            jobCategory.length - 1
                          }`}
                    </p>
                    {!jobCategory || jobCategory.length === 0 ? (
                      <div
                        className="flex-shrink-0 size-[14px] bg-cover bg-center"
                        style={{
                          backgroundImage: `url(/icons/chevron-down.black.svg)`,
                          filter: 'none',
                        }}
                      />
                    ) : (
                      <div
                        className="flex-shrink-0 size-[14px] bg-cover bg-center"
                        style={{
                          backgroundImage: `url(/icons/chevron-down.white.svg)`,
                          filter: 'none',
                        }}
                      />
                    )}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
