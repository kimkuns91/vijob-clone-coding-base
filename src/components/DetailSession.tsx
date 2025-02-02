import React from 'react';

interface DetailSessionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const DetailSession: React.FC<DetailSessionProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className="flex flex-col w-full items-start gap-4 pt-0 pb-5 px-0 relative">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-[5px] whitespace-nowrap pr-4">
          <div
            className="flex-shrink-0 size-5 bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${icon})`,
            }}
          />
          <h2 className="w-fit text-headline1 whitespace-nowrap relative text-black">
            {title}
          </h2>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default DetailSession;
