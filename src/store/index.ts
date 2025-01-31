import { ICity, IJobCategory, IProvinces } from '@/interface';
import {
  getLocalStorageItem,
  getSessionStorageItem,
  removeLocalStorageItem,
  removeSessionStorageItem,
  setLocalStorageItem,
  setSessionStorageItem,
} from '@/lib/storage';

import { create } from 'zustand';

// 시트 관련 상태
interface ISheetState {
  // LocationSheet 관련
  isLocationSheetOpen: boolean;
  setIsLocationSheetOpen: (isOpen: boolean) => void;

  // OccupationSheet 관련
  isOccupationSheetOpen: boolean;
  setIsOccupationSheetOpen: (isOpen: boolean) => void;
}

// 필터 관련 상태
interface IFilterState {
  // 검색 관련
  keyword: string | null;
  setKeyword: (search: string | null) => void;

  search: string | null;
  setSearch: (search: string | null) => void;

  // 지역 선택 관련
  // 시
  selectedProvinces: IProvinces | null;
  setSelectedProvinces: (province: IProvinces | null) => void;

  // 구
  selectedCity: ICity | null;
  setSelectedCity: (city: ICity | null) => void;

  // 직종 필터
  jobCategory: IJobCategory[] | null;
  setJobCategory: (
    jobCategory:
      | IJobCategory[]
      | null
      | ((prev: IJobCategory[] | null) => IJobCategory[] | null)
  ) => void;

  // 채용 중 관련
  isRecruitment: boolean;
  setIsRecruitment: (isRecruitment: boolean) => void;

  // 초기화 관련
  clearSearch: () => void;
  clearJobCategory: () => void;
}

interface IFilterStore extends ISheetState, IFilterState {}

export const useFilterStore = create<IFilterStore>((set, get) => ({
  // LocationSheet 관련
  isLocationSheetOpen: false,
  setIsLocationSheetOpen: (isOpen) => set({ isLocationSheetOpen: isOpen }),

  // OccupationSheet 관련
  isOccupationSheetOpen: false,
  setIsOccupationSheetOpen: (isOpen) => set({ isOccupationSheetOpen: isOpen }),

  // 검색 관련
  keyword: null,
  setKeyword: (keyword) => set({ keyword }),

  search: getSessionStorageItem('search'),
  setSearch: (search) => {
    if (search) {
      setSessionStorageItem('search', search);
    } else {
      removeSessionStorageItem('search');
    }
    set({ search });
  },

  // 지역 선택 관련
  selectedProvinces: JSON.parse(
    getLocalStorageItem('selectedProvinces') || 'null'
  ),
  setSelectedProvinces: (province) => {
    if (province) {
      setLocalStorageItem('selectedProvinces', JSON.stringify(province));
    } else {
      removeLocalStorageItem('selectedProvinces');
    }
    set({
      selectedProvinces: province,
      selectedCity: null,
    });
  },

  selectedCity: JSON.parse(getLocalStorageItem('selectedCity') || 'null'),
  setSelectedCity: (city) => {
    if (city) {
      setLocalStorageItem('selectedCity', JSON.stringify(city));
    } else {
      removeLocalStorageItem('selectedCity');
    }
    set({ selectedCity: city });
  },

  // 직종 필터
  jobCategory: JSON.parse(getLocalStorageItem('jobCategory') || 'null'),
  setJobCategory: (jobCategory) => {
    const newJobCategory =
      typeof jobCategory === 'function'
        ? jobCategory(get().jobCategory)
        : jobCategory;

    if (newJobCategory) {
      setLocalStorageItem('jobCategory', JSON.stringify(newJobCategory));
    } else {
      removeLocalStorageItem('jobCategory');
    }

    set({ jobCategory: newJobCategory });
  },

  // 채용 중 관련
  isRecruitment:
    getSessionStorageItem('isRecruitment') !== null
      ? getSessionStorageItem('isRecruitment') === 'true'
      : true,
  setIsRecruitment: (isRecruitment) => {
    setSessionStorageItem('isRecruitment', String(isRecruitment));
    set({ isRecruitment });
  },

  // 초기화 관련
  clearSearch: () => {
    removeSessionStorageItem('search');
    set({ search: null, keyword: null });
  },
  clearJobCategory: () => {
    removeLocalStorageItem('jobCategory');
    set({ jobCategory: null });
  },
}));
