import BottomNav from '@/components/layout/BottomNav';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lang: Language;
  };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div
      className={cn(
        'w-full',
        // 테스트 CSS 추후 삭제
        'h-screen bg-slate-100'
      )}
      lang={params.lang}
    >
      <div className="overflow-hidden w-full h-full">
        <div className="flex flex-col relative w-full h-full vijob-bg-color overflow-hidden pointer-events-auto">
          <div className="relative w-full h-full overflow-x-hidden overflow-y-auto transition-all">
            <div className="flex flex-col w-full h-full overflow-hidden">
              {children}
              <BottomNav lang={params.lang} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
