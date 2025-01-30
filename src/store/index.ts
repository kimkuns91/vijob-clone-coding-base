import { ICity, IJobCategory, IProvinces } from '@/interface';

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

  search: sessionStorage.getItem('search'),
  setSearch: (search) => {
    if (search) {
      sessionStorage.setItem('search', search);
    } else {
      sessionStorage.removeItem('search');
    }
    set({ search });
  },

  // 지역 선택 관련
  selectedProvinces: JSON.parse(localStorage.getItem('selectedProvinces') || 'null'),
  setSelectedProvinces: (province) => {
    if (province) {
      localStorage.setItem('selectedProvinces', JSON.stringify(province));
    } else {
      localStorage.removeItem('selectedProvinces');
    }
    set({
      selectedProvinces: province,
      selectedCity: null, // 시/도가 변경되면 구/군 초기화
    });
  },

  selectedCity: JSON.parse(localStorage.getItem('selectedCity') || 'null'),
  setSelectedCity: (city) => {
    if (city) {
      localStorage.setItem('selectedCity', JSON.stringify(city));
    } else {
      localStorage.removeItem('selectedCity');
    }
    set({ selectedCity: city });
  },

  // 직종 필터
  jobCategory: JSON.parse(localStorage.getItem('jobCategory') || 'null'),
  setJobCategory: (jobCategory) => {
    const newJobCategory = typeof jobCategory === 'function'
      ? jobCategory(get().jobCategory)
      : jobCategory;
      
    if (newJobCategory) {
      localStorage.setItem('jobCategory', JSON.stringify(newJobCategory));
    } else {
      localStorage.removeItem('jobCategory');
    }
    
    set({ jobCategory: newJobCategory });
  },

  // 채용 중 관련
  isRecruitment: sessionStorage.getItem('isRecruitment') !== null 
    ? sessionStorage.getItem('isRecruitment') === 'true'
    : true, // 기본값을 true로 설정
  setIsRecruitment: (isRecruitment) => {
    sessionStorage.setItem('isRecruitment', String(isRecruitment));
    set({ isRecruitment });
  },

  // 초기화 관련
  clearSearch: () => {
    sessionStorage.removeItem('search');
    set({ search: null, keyword: null });
  },
  clearJobCategory: () => {
    localStorage.removeItem('jobCategory');
    set({ jobCategory: null });
  },
}));
