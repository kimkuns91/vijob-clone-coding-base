'use client';

import CloseButton from '../ui/closeButton';
import { Input } from '../ui/input';
import SearchButton from '../ui/searchButton';
import { useEffect } from 'react';
import { useFilterStore } from '@/store';

const SearchController = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const { keyword, setKeyword, setSearch } = useFilterStore();

  const handleSearch = () => {
    setSearch(keyword);
    handleClose();
  };

  useEffect(() => {
    const savedKeyword = sessionStorage.getItem('searchKeyword');
    if (savedKeyword) {
      setKeyword(savedKeyword);
    }
  }, [setKeyword]);

  return (
    <div className="relative flex-shrink-0 h-14">
      <div className="absolute w-full h-full flex flex-row justify-between">
        <form
          className="relative pl-4 py-2 w-full h-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Input
            value={keyword || ''}
            onChange={(e) => setKeyword(e.target.value)}
            className="block w-full h-full max-h-[200px] rounded-[18px] text-[16px] leading-normal px-4 m-0 border-0 resize-none text-gray-900 bg-white placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none"
            placeholder="일자리를 검색해보세요"
            maxLength={50}
          />
        </form>
        <div className="flex-shrink-0 flex flex-row gap-[1px] pr-2">
          <SearchButton
            onClick={handleSearch}
            className="vijob-activatable flex-shrink-0 select-none outline-none border-none  px-2 py-4"
          />
          <CloseButton
            onClick={handleClose}
            className="vijob-activatable flex-shrink-0 select-none outline-none border-none  px-2 py-4"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchController;
