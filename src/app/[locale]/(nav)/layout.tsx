import BottomNav from '@/components/layout/BottomNav';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div
      className={cn(
        'w-full min-h-screen vijob-bg-color',
        'flex flex-col relative'
      )}
    >
      <div className="flex-1 flex flex-col">
        {children}
        <BottomNav locale={locale} />
      </div>
    </div>
  );
}
