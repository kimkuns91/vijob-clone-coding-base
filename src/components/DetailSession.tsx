import React from 'react';

interface DetailSessionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  modalButton?: boolean;
  modalButtonText?: string;
  modalButtonOnClick?: () => void;
}

const DetailSession: React.FC<DetailSessionProps> = ({
  title,
  icon,
  children,
  modalButton,
  modalButtonText,
  modalButtonOnClick,
}) => {
  return (
    <div className="flex flex-col w-full items-start gap-4 pt-0 pb-5 px-0 relative">
      <div className="flex flex-row w-full items-center justify-between gap-2">
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
        {modalButton && (
          <button
            className="all-[unset] box-border inline-flex items-center justify-center gap-1 px-3 py-2 relative flex-[0_0_auto] rounded-md border border-solid border-[#d9d9d9] bg-white active:bg-neutral-50"
            onClick={modalButtonOnClick}
          >
            <p className="relative w-fit text-caption2 text-black whitespace-nowrap">
              {modalButtonText}
            </p>
          </button>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DetailSession;
