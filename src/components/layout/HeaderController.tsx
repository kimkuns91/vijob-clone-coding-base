'use client';

import SearchButton from '../ui/searchButton';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store';
import { useTranslations } from 'next-intl';

const HeaderController = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const t = useTranslations('JobPage');
  const {
    isLocationSheetOpen,
    setIsLocationSheetOpen,
    selectedProvinces,
    selectedCity,
  } = useFilterStore();

  const handleOpenLocationSheet = () => {
    setIsLocationSheetOpen(true);
  };

  return (
    <>
      <div className="relative flex-shrink-0 h-14">
        <div className="relative flex flex-row justify-start items-center h-full pl-4 pr-24 w-full">
          <div className="relative overflow-hidden pr-4">
            <p className="truncate w-fit text-display5">
              <span
                className="inline-block w-[22.6px] h-[30px] mr-2 bg-contain bg-no-repeat"
                style={{ backgroundImage: 'url("/icons/newyear-east.png")' }}
              >
                &nbsp;
              </span>
              {selectedProvinces?.name || selectedCity?.name || t('nationwide')}
            </p>
          </div>
          <div
            onClick={handleOpenLocationSheet}
            className="flex-shrink-0 flex items-center justify-center w-[24px] h-[24px] border border-E9E9E9 rounded-full bg-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className={cn(
                'h-6 w-6 flex-shrink-0 transition-transform duration-300 -rotate-180',
                !isLocationSheetOpen && 'rotate-0'
              )}
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {/* 검색 버튼 */}
          <div className="absolute flex flex-row gap-[1px] right-2 top-0 h-full">
            <SearchButton onClick={() => setIsOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderController;
