import DetailSession from './DetailSession';
import { useTranslations } from 'next-intl';

const JobDetail = () => {
  const t = useTranslations('JobDetailPage');
  const sections = [
    {
      title: t('prefer'),
      icon: '/icons/favorite.svg',
      children: <div>안녕하세요</div>,
    },
    {
      title: t('provide'),
      icon: '/icons/favorite.svg',
      children: <div>안녕하세요</div>,
    },
    {
      title: t('location'),
      icon: '/icons/favorite.svg',
      children: <div>안녕하세요</div>,
    },
    {
      title: t('details'),
      icon: '/icons/favorite.svg',
      children: (
        <div className="flex w-full items-center justify-start relative gap-4 overflow-auto">
          <div className="w-full bg-neutral-50 rounded-lg p-[10px]">
            <p className="text-neutral-800 text-[13px] leading-[18px] font-normal break-words whitespace-pre-wrap">
              {t('exampleDetail')}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t('period'),
      icon: '/icons/favorite.svg',
      children: <div>안녕하세요</div>,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section, index) => (
        <DetailSession key={index} title={section.title} icon={section.icon}>
          {section.children}
        </DetailSession>
      ))}
    </div>
  );
};

export default JobDetail;
