interface IconCardProps {
  icon: string;
  label: string;
}

const IconCard = ({ icon, label }: IconCardProps) => {
  return (
    <div className="flex-shrink-0 flex flex-col w-[110px] items-start gap-2.5 pt-2 pb-[15px] px-2 relative bg-white rounded-[10px] border border-solid border-[#e9e9e9]">
      <div className="flex-col h-[70px] items-center justify-center gap-1 px-[15px] py-2.5 bg-[#f2f4f6] rounded-lg flex relative self-stretch w-full">
        <div
          className="flex-shrink-0 size-10 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url("${icon}")` }}
        />
      </div>
      <div className="items-start gap-2.5 flex-[0_0_auto] flex relative self-stretch w-full">
        <div className="relative flex-1 text-caption3 text-black text-center">
          {label}
        </div>
      </div>
    </div>
  );
};

export default IconCard;
