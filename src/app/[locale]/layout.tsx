import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { NextLayout } from '../providers';
import { NextProvider } from '../providers';
import { cn } from '@/lib/utils';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const pretendard = localFont({
  src: [
    {
      path: '../../../public/fonts/Pretendard-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Vijob - 한국의 외국인을 위한 종합 플랫폼',
  description:
    '일자리를 찾는 외국인들에게는 많은 일자리를 쉽고 편하게 찾을 수 있는 기회를, 외국인을 채용하려는 고용주에게는 필요한 인재를 빠르게 찾을 수 있는 기회를 드립니다.',
  icons: {
    icon: [
      {
        url: '/logo/vijob-app.png',
        href: '/logo/vijob-app.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: '/logo/vijob-app.png',
    apple: '/logo/vijob-app.png',
  },
};

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={cn(pretendard.variable, 'antialiased')}>
      <body className="font-pretendard">
        <NextIntlClientProvider messages={messages}>
          <NextProvider>
            <NextLayout>{children}</NextLayout>
          </NextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
