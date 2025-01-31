import { useTranslations } from 'next-intl';

export default function CommunityPage() {
  const t = useTranslations('CommunityPage');

  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      {t('title')}
    </div>
  );
}
