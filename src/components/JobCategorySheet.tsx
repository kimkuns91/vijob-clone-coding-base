'use client';

import CheckableSquare from './ui/checkableSquare';
import CheckedSquare from './ui/checkedSquare';
import { IJobCategory } from '@/interface';
import Image from 'next/image';
import jobCategories from '@/data/job-categories.json';
import { useState } from 'react';

interface Props {
  categories: IJobCategory[] | null;
  setCategories: (categories: IJobCategory[] | null | ((prev: IJobCategory[] | null) => IJobCategory[] | null)) => void;
}

const JobCategorySheet = ({ categories, setCategories }: Props) => {
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  // parentId가 null인 최상위 카테고리 필터링
  const parentCategories = jobCategories.filter(
    (category) => category.parentId === null
  );

  // 특정 parentId를 가진 하위 카테고리 가져오기
  const getChildCategories = (parentId: number) => {
    return jobCategories.filter((category) => category.parentId === parentId);
  };

  const handleToggleCategory = (categoryId: number) => {
    setOpenCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleCategorySelect = (category: IJobCategory) => {
    setCategories((prev) => {
      if (!prev) return [category];

      const exists = prev.some((cat) => cat.id === category.id);
      if (exists) {
        return prev.filter((cat) => cat.id !== category.id);
      }

      if (prev.length >= 3) {
        return prev;
      }

      return [...prev, category];
    });
  };

  const isCategorySelected = (categoryId: number) => {
    return categories?.some((cat) => cat.id === categoryId) ?? false;
  };

  return (
    <div className="relative overflow-auto w-full h-full">
      <ul>
        {parentCategories.map((parent) => (
          <li key={parent.id} className="relative h-fit overflow-hidden">
            <div
              className="relative w-full flex flex-row justify-between items-center gap-4 cursor-pointer overflow-hidden"
              onClick={() => handleToggleCategory(parent.id)}
            >
              <p className="text-body1 text-neutral-600 min-h-[48px] py-[8px] flex items-center w-full vijob-wrap-text">
                {parent.i18nNames.KO_KR}
              </p>
              <div className="flex-shrink-0 size-[48px] flex justify-center items-center">
                <Image
                  className="size-[16px] bg-contain bg-center bg-no-repeat transition-transform rotate-0"
                  src="/icons/chevron-down.black.svg"
                  alt="chevron-down"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            {openCategories.includes(parent.id) && (
              <div className="h-fit overflow-hidden">
                <div className="grid grid-cols-2 gap-[15px] pt-[10px] pb-[40px]">
                  {getChildCategories(parent.id).map((child) => (
                    <div
                      key={child.id}
                      className="flex flex-row justify-start items-center"
                      onClick={() => handleCategorySelect(child)}
                    >
                      <div className="min-h-8 py-2 flex flex-row items-center justify-start gap-2 group">
                        {isCategorySelected(child.id) ? (
                          <CheckedSquare />
                        ) : (
                          <CheckableSquare />
                        )}
                        <p className="w-fit text-sm text-left vijob-wrap-text leading-[18.9px] tracking-[-0.28px]">
                          {child.i18nNames.KO_KR}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobCategorySheet;
