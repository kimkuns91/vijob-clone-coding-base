import Link from "next/link";

interface JobCardProps {
  company: string;
  categories: string;
  workDays: string;
  workHours: string;
  salary: string;
  status: string;
  location?: string;
  companyLogo?: string;
}

const JobCard = ({
  company,
  categories,
  workDays,
  workHours,
  salary,
  status,
  location = "동자동",
  companyLogo = "/logo/vijob-app.png",
}: JobCardProps) => {
  return (
    <Link
      href={`/ko/job/100`}
      className="relative flex flex-col w-full gap-[10px] vijob-activatable"
    >
      {/* 카드 메인 */}
      <div
        className="flex items-start p-4 relative rounded-[20px] bg-white"
        style={{ boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex-col gap-1 flex-1 grow flex items-start relative">
          {/* 회사명 */}
          <div className="gap-2.5 px-[7px] py-[4px] self-stretch w-full flex-[0_0_auto] bg-[#1e7ef6] text-white rounded flex items-start relative">
            <div className="relative font-bold text-[13px] tracking-[-0.50px] leading-[15px] vijob-wrap-text line-clamp-3">
              {company}
            </div>
          </div>

          {/* 직종 카테고리 */}
          <div className="gap-2.5 px-[7px] py-[4px] self-stretch w-full flex-[0_0_auto] bg-[#f06125] text-black rounded flex items-start relative">
            <div className="relative font-bold text-[13px] tracking-[-0.50px] leading-[15px] vijob-wrap-text line-clamp-3">
              {categories}
            </div>
          </div>

          {/* 근무 시간 */}
          <div className="gap-2.5 px-[7px] py-[4px] self-stretch w-full flex-[0_0_auto] bg-[#3da758] text-black rounded flex items-start relative">
            <div className="relative font-bold text-[13px] tracking-[-0.50px] leading-[15px] vijob-wrap-text">
              {workDays}
              <br />
              {workHours}
            </div>
          </div>

          {/* 급여 */}
          <div className="gap-2.5 px-[7px] py-[4px] self-stretch w-full flex-[0_0_auto] bg-white text-black ring-[0.5px] ring-inset ring-[#7b7b7b] rounded flex items-start relative">
            <div className="relative font-bold text-[13px] tracking-[-0.50px] leading-[15px] vijob-wrap-text">
              {salary}
            </div>
          </div>

          {/* 채용 상태 */}
          <div className="gap-2.5 px-[7px] py-[4px] self-stretch w-full bg-black text-white rounded flex items-start relative">
            <div className="relative font-bold text-[13px] tracking-[-0.50px] leading-[15px] vijob-wrap-text">
              {status}
            </div>
          </div>
        </div>
      </div>

      {/* 회사 정보 */}
      <div className="w-full flex flex-row items-center gap-[7px] relative overflow-hidden">
        <div
          className="flex-shrink-0 relative w-9 h-9 rounded-[200px] border-[0.5px] border-[#d9d9d9] bg-cover bg-[50%_50%]"
          style={{ backgroundImage: `url("${companyLogo}")` }}
        />
        <div className="flex flex-col items-start gap-[5px] relative">
          <div className="flex items-center gap-[3px] relative">
            <div className="relative w-full text-caption1 text-[#555555] line-clamp-2">
              {location}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
