import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware(routing);

// 미들웨어 함수
export default async function middleware(request: NextRequest) {
  // 현재 요청 경로가 루트('/')인 경우
  if (request.nextUrl.pathname === '/') {
    // 브라우저의 기본 언어 설정 가져오기
    const locale =
      request.headers.get('accept-language')?.split(',')[0].split('-')[0] ||
      'en';

    // 지원하는 locale인지 확인
    const validLocale = ['ko', 'en'].includes(locale) ? locale : 'en';

    // /locale/job으로 리다이렉트
    return NextResponse.redirect(new URL(`/${validLocale}/job`, request.url));
  }

  // 다른 경로는 기존 intl 미들웨어로 처리
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ko|en)/:path*'],
};
