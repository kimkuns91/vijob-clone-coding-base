import { useTranslations } from 'next-intl';

export default function SettingPage() {
  const t = useTranslations('SettingPage');

  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      {t('title')}
    </div>
  );
}
