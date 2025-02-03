import IconCard from './IconCard';

interface PreferSectionProps {
  t: (key: string) => string;
}

const PreferSection = ({ t }: PreferSectionProps) => {
  const preferItems = [
    { icon: '/icons/preferential-education.svg', label: t('education') },
    { icon: '/icons/preferential-experience.svg', label: t('experience') },
    { icon: '/icons/preferential-korean.svg', label: t('korean') },
    {
      icon: '/icons/preferential-long-term-contract.svg',
      label: t('longTerm'),
    },
  ];

  return (
    <div className="relative w-full h-fit">
      <div className="relative w-full h-full">
        <div className="overflow-scroll flex w-full items-stretch justify-start relative gap-[5px] pb-4 overflow-x-auto overflow-y-hidden">
          {preferItems.map((item, index) => (
            <IconCard key={index} icon={item.icon} label={item.label} />
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
          {/* ... gradient divs ... */}
        </div>
      </div>
    </div>
  );
};

export default PreferSection;
