import { useTranslations } from 'next-intl';

export default function ContentPage() {
  const t = useTranslations('ContentPage');

  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      {t('title')}
    </div>
  );
}
