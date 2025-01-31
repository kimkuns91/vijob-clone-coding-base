import React from 'react';

interface DetailSessionProps {
  title: string;
}

const DetailSession: React.FC<DetailSessionProps> = ({ title }) => {
  return (
    <div className="flex flex-col w-full items-start gap-4 pt-0 pb-5 px-0 relative">
      <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto] gap-4">
        <div className="inline-flex items-center gap-[5px] relative overflow-hidden">
          <div
            className="flex-shrink-0 size-5 bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(/icons/favorite.svg)`,
            }}
          />
          <div className="relative w-full overflow-hidden">
            <div
              className="relative max-w-full"
              style={{
                maskSize: '200% 100%',
                maskPosition: '-24px center',
                transition: 'mask-position 0.4s',
              }}
            >
              <div
                className="relative left-0 whitespace-nowrap pr-4"
                style={{
                  transform: 'translateX(0px)',
                }}
              >
                <div className="w-fit text-headline1 whitespace-nowrap relative text-black">
                  {title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      DetailSession
    </div>
  );
};

export default DetailSession;
