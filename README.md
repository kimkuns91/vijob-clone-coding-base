# Vijob 클론 코딩 과제 - 김건우

## 🚀 프로젝트 소개
채용 정보를 제공하는 웹 애플리케이션의 클론 코딩 프로젝트입니다.

## 💻 실행 방법

### 설치 및 실행
```bash
# 패키지 설치
yarn install

# 개발 서버 실행 (http://localhost:3000)
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

### 개발 도구
```bash
# 스토리북 실행
yarn storybook

# 스토리북 빌드
yarn build-storybook

# 테스트 실행
yarn test

# 테스트 감지 실행
yarn test:watch
```

## 📁 프로젝트 구조
```
📁 vijob-clone-coding-base/
├─ 📁 .storybook/        # 스토리북 설정
├─ 📁 assets/            # 정적 자원 (Lottie)
├─ 📁 docs/              # 문서
├─ 📁 messages/          # 다국어 메시지  
├─ 📁 public/            # 공개 자원
├─ 📁 src/
│  ├─ 📁 __tests__/      # 테스트 파일
│  ├─ 📁 app/            # App Router 라우트
│  │  ├─ 📁 [locale]/    # 다국어 지원
│  │  └─ 📁 api/         # API 엔드포인트
│  ├─ 📁 components/     # 공통 컴포넌트
│  │  ├─ 📁 ui/          # UI 컴포넌트
│  │  └─ 📁 layout/      # 레이아웃 컴포넌트
│  ├─ 📁 config/         # 설정
│  ├─ 📁 data/           # 데이터
│  ├─ 📁 hooks/          # 커스텀 훅
│  ├─ 📁 i18n/           # 국제화
│  ├─ 📁 interface/      # 타입 정의
│  ├─ 📁 lib/            # 라이브러리
│  ├─ 📁 store/          # 상태 관리
│  ├─ 📁 stories/        # 스토리북
│  ├─ 📁 styles/         # 스타일
│  └─ 📁 utils/          # 유틸리티
```

## ✨ 주요 기능
- ♾️ 무한 스크롤 목록
- 🔄 상태 유지 관리
- 🌐 다국어 지원 (한국어/영어)
- 🎨 반응형 UI
- 🤖 AI 기반 번역

## ✅ 구현 체크리스트
- ✅ 카드 목록 Infinite Scroll
- ✅ 카드 슬라이드 좌우 Infinite Scroll
- ✅ 기본 언어 (한국어) 설정
- ✅ Mock 데이터 API 구현
- ✅ 디자인 시스템 준수
- ✅ Context API 상태 관리
- ✅ Storybook UI 컴포넌트
- ✅ Jest 테스트 코드
- ⬜ 목록 상태 유지
- ⬜ AI 번역 기능

## 🛠️ 기술 스택
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- React Query (@tanstack/react-query)
- Zustand
- Storybook
- Jest
- React Testing Library
