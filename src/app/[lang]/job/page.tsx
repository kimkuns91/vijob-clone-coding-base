import Header from "@/components/layout/Header";
import JobCardList from "@/components/JobCardList";

export default async function JobPage() {
  return (
    <>
      <Header />
      <div className="relative h-[calc(100vh-56px)] overflow-hidden bg-[#F7F7FA]">
        <div className="bg-bg-transparent h-full">
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="relative w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar"
              style={{ overscrollBehavior: "none" }}
            >
              <div style={{ width: "100%", height: "216px" }} />
              <div className="w-full flex flex-col justify-between items-start mt-[8px] mb-[20px]">
                {/* 채용 중 컨트롤러 */}
                <div className="w-full flex justify-between items-start">
                  <div className="flex flex-row items-center gap-[5px] overflow-hidden">
                    <div
                      className="flex-shrink-0 ml-4 w-[80px] h-[48px] bg-center bg-no-repeat bg-contain"
                      style={{
                        backgroundImage: `url(/images/foreeder-desk.blue.svg)`,
                      }}
                    />
                    <p className="text-black text-base font-semibold tracking-[-0.32px] leading-5 line-clamp-1">
                      환영해요!
                    </p>
                  </div>
                  <button className="flex-shrink-0 group relative flex flex-row-reverse justify-start items-center gap-1 px-4 py-2">
                    <div
                      className="flex-shrink-0 size-4 bg-contain bg-no-repeat"
                      style={{
                        backgroundImage: `url(/icons/checked-small.blue.svg)`,
                      }}
                    />
                    <p className="text-sm line-clamp-1">채용 중</p>
                  </button>
                </div>
                {/* 새로 등록된 일자리 */}
                <div className="w-full px-4 pt-4">
                  <div className="w-full px-4 py-1.5 rounded-lg bg-white">
                    <div
                      className="relative max-w-full"
                      style={{
                        maskSize: "200% 100%",
                        maskPosition: "-24px center",
                        transition: "mask-position 0.4s",
                      }}
                    >
                      <div
                        className="relative overflow-hidden flex w-full items-center"
                        style={{
                          maskSize: "200% 100%",
                          maskPosition: "100% center",
                        }}
                      >
                        <div
                          className="relative left-0 whitespace-nowrap pr-4"
                          style={{ transform: "translateX(0px)" }}
                        >
                          <p className="text-sm text-neutral-600">
                            오늘 새로 등록된 일자리 전국{" "}
                            <span className="text-blue-500 font-semibold">
                              84
                            </span>{" "}
                            건
                          </p>
                        </div>
                        <div
                          className="relative left-0 whitespace-nowrap pr-4 hidden"
                          style={{ transform: "translateX(0px)" }}
                        >
                          <p className="text-sm text-neutral-600">
                            오늘 새로 등록된 일자리 전국{" "}
                            <span className="text-blue-500 font-semibold">
                              84
                            </span>{" "}
                            건
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pt-1">
                <JobCardList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
