import Image from 'next/image';

const NoJobList = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 relative px-4 py-5 mt-[50px]">
      <Image
        className="relative"
        alt="Element"
        src="/images/foreeder-seeker.blue.svg"
        width={120}
        height={120}
      />
      <div className="inline-flex items-center gap-1.5 relative">
        <p className="relative w-fit font-semibold text-sm text-center tracking-[-0.28px] leading-5 whitespace-pre-wrap text-black">
          위 조건에 해당하는 공고가 없어요.
          <br />
          조건을 바꿔서 검색해 주세요 🔍
        </p>
      </div>
    </div>
  );
};

export default NoJobList;
