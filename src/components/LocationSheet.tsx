'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { IProvinces } from '@/interface';
import Image from 'next/image';
import cities from '@/data/cities.json';
import { cn } from '@/lib/utils';
import provinces from '@/data/provinces.json';
import { useFilterStore } from '@/store';

interface ICity {
  provinceCode: string;
  code: string;
  name: string;
  address: string;
}

const LocationSheet = () => {
  const {
    isLocationSheetOpen,
    setIsLocationSheetOpen,
    selectedProvinces,
    setSelectedProvinces,
    selectedCity,
    setSelectedCity,
  } = useFilterStore();

  const [selectedProvince, setSelectedProvince] = useState<IProvinces | null>(
    selectedProvinces
  );
  const [filteredCities, setFilteredCities] = useState<ICity[]>([]);

  // 시/도가 선택되면 해당하는 구/군 목록 필터링
  useEffect(() => {
    if (selectedProvince) {
      const filtered = cities.filter(
        (city) => city.provinceCode === selectedProvince.code
      );
      setFilteredCities(filtered);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (isLocationSheetOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedProvince(selectedProvinces);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLocationSheetOpen, selectedProvinces]);

  const handleClose = () => {
    setIsLocationSheetOpen(false);
  };

  const handleProvinceClick = (province: (typeof provinces)[0] | null) => {
    setSelectedProvinces(province);
    setSelectedCity(null);
  };

  const handleCityClick = (city: ICity) => {
    setSelectedCity(city);
    setIsLocationSheetOpen(false);
  };

  return (
    <AnimatePresence>
      {isLocationSheetOpen && (
        <motion.div
          className="absolute inset-0 z-[30]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          />
          {/* 컨텐츠 */}
          <motion.div
            className="absolute left-[16px] top-[60px] z-50 max-w-[430px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="z-50 rounded-md border bg-white text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative max-w-[calc(100vw-32px)] w-fit h-[50vh] p-1 border-none">
              <div className="flex h-full gap-1">
                {/* 시/도 목록 */}
                <ul className="w-52 text-left p-2 overflow-y-auto">
                  <li
                    className={cn(
                      'flex w-full justify-between items-center px-4 pr-2 py-2 gap-2 rounded-lg cursor-pointer',
                      'hover:bg-gray-50 text-gray-500 font-medium',
                      !selectedProvince &&
                        !selectedProvinces &&
                        !selectedCity &&
                        'bg-gray-50 text-black'
                    )}
                    onClick={() => handleProvinceClick(null)}
                  >
                    전국
                  </li>
                  {provinces.map((province) => (
                    <li
                      key={province.code}
                      className={`flex w-full justify-between items-center px-4 pr-2 py-2 gap-2 rounded-lg cursor-pointer
                        hover:bg-gray-50 text-gray-500 ${
                          selectedProvince?.code === province.code
                            ? 'bg-gray-50 text-black'
                            : ''
                        }`}
                      onClick={() => setSelectedProvince(province)}
                    >
                      <p>{province.name}</p>
                      <Image
                        src={'/icons/chevron-right.svg'}
                        alt={'chevron-right'}
                        width={20}
                        height={20}
                      />
                    </li>
                  ))}
                </ul>

                {/* 구/군 목록 */}
                {selectedProvince && (
                  <ul className="w-52 text-left p-2 overflow-y-auto border-l">
                    <li
                      className={cn(
                        'flex w-full justify-between items-center px-4 pr-2 py-2 gap-2 rounded-lg cursor-pointer',
                        'hover:bg-gray-50 text-gray-500 font-medium'
                      )}
                      onClick={() => {
                        handleProvinceClick(selectedProvince);
                        setIsLocationSheetOpen(false);
                      }}
                    >
                      전체
                    </li>
                    {filteredCities.map((city) => (
                      <li
                        key={city.code}
                        onClick={() => handleCityClick(city)}
                        className={`flex w-full justify-between items-center px-4 pr-2 py-2 gap-2 rounded-lg cursor-pointer
                            hover:bg-gray-50 text-gray-500 ${
                              selectedCity?.code === city.code
                                ? 'bg-gray-50 text-black'
                                : ''
                            }`}
                      >
                        <p>{city.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationSheet;
