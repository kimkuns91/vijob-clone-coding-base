const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bg-opacity-80 backdrop-blur-[20px] z-[20]">
      <div className="relative flex-shrink-0 h-14"></div>
      <div className="relative">
        {/* GS25 배너 */}
        <div className="relative size-full h-[100px] px-4 py-[10px]">
          <div
            className="relative w-full h-full rounded-[10px] overflow-hidden"
            style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="relative flex flex-col justify-between items-center w-full h-full p-[20px] bg-brand-gs25 cursor-pointer">
              <div className="flex justify-between items-center gap-[15px] self-stretch h-full">
                <div
                  className="flex-shrink-0 w-[70.83px] h-[25px] bg-contain bg-right bg-no-repeat"
                  style={{ backgroundImage: `url(/banners/banner_gs25.png)` }}
                />
                <span className="text-white font-[600] text-[14px] leading-[16.8px]">
                  전국 GS25 편의점 아르바이트 및 직원채용
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
                  className="flex-shrink-0 rounded-full px-[15px] py-[8px] flex justify-center items-center cursor-pointer select-none 
              bg-white active:bg-neutral-50 ring-1 ring-inset ring-neutral-100"
                >
                  <div className="relative flex flex-row justify-center items-center gap-[4px]">
                    <p className="text-[14px] text-neutral-800 font-bold leading-[18.9px] tracking-[-0.28px] capitalize">
                      초기화
                    </p>
                    <div
                      className="flex-shrink-0 size-[14px] bg-cover bg-center"
                      style={{
                        backgroundImage: `url(/icons/refresh.svg)`,
                        filter: "none",
                      }}
                    />
                  </div>
                </div>
              </li>
              <li className="flex-shrink-0">
                <div className="rounded-full px-[15px] py-[8px] flex justify-center items-center cursor-pointer select-none bg-white ring-1 ring-inset ring-neutral-100">
                  <div className="relative flex flex-row justify-center items-center gap-[4px] text-neutral-800">
                    <p className="text-[14px] font-bold leading-[18.9px] tracking-[-0.28px] capitalize">
                      직종
                    </p>
                    <div
                      className="flex-shrink-0 size-[14px] bg-cover bg-center"
                      style={{
                        backgroundImage: `url(/icons/chevron-down.black.svg)`,
                        filter: "none",
                      }}
                    />
                  </div>
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
