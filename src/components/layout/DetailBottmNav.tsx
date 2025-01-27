const DetailBottomNav = () => {
  return (
    <div className="flex flex-row gap-4 absolute left-0 right-0 bottom-0 m-4">
      <button className="w-full px-[25px] py-[15px] text-body1 rounded-lg truncate cursor-pointer text-neutral-white bg-blue-500 hover:bg-blue-600 active:bg-blue-600 disabled:bg-neutral-200 disabled:hover:bg-neutral-200 disabled:active:bg-neutral-200">
        전화하기
      </button>
      <button className="w-full px-[25px] py-[15px] text-body1 rounded-lg truncate cursor-pointer text-neutral-white bg-blue-500 hover:bg-blue-600 active:bg-blue-600 disabled:bg-neutral-200 disabled:hover:bg-neutral-200 disabled:active:bg-neutral-200">
        문자 보내기
      </button>
    </div>
  );
};

export default DetailBottomNav;
