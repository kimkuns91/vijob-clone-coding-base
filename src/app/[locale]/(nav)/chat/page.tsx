import { useTranslations } from 'next-intl';

export default function ChatPage() {
  const t = useTranslations('ChatPage');

  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      {t('title')}
    </div>
  );
}
