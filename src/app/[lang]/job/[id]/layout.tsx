import Link from "next/link";

interface JobDetailLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function JobDetailLayout({ children }: JobDetailLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-[20px] z-10">
        <div className="relative flex-shrink-0 h-14">
          {/* 왼쪽 뒤로가기 버튼 */}
          <div className="absolute left-2 top-0 h-full">
            <Link href={"/ko/job"}>
              <button className="flex-shrink-0 select-none outline-none border-none  px-2 py-4">
                <div
                  className="w-6 h-6 bg-no-repeat bg-contain"
                  style={{ backgroundImage: "url('/icons/back.48x48.png')" }}
                />
              </button>
            </Link>
          </div>

          {/* 오른쪽 버튼들 */}
          <div className="absolute flex flex-row gap-[1px] right-2 top-0 h-full">
            <button className="vijob-activatable flex-shrink-0 select-none outline-none border-none px-2 py-4">
              <div
                className="w-6 h-6 bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('/icons/share.svg')" }}
              />
            </button>
            <button className="vijob-activatable flex-shrink-0 select-none outline-none border-none px-2 py-4">
              <div
                className="w-6 h-6 bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('/icons/more.48x48.png')" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative h-full overflow-hidden">
        {children}
        <div className="relative w-full h-full overflow-hidden">
          <div className="relative overflow-x-hidden overflow-y-auto scroll-smooth w-full h-full">
            <div className="w-full h-[56px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
