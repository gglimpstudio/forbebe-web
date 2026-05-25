# 포베베 공식 웹사이트

카시트 & 유모차 전문 세탁업체 포베베의 예약 전환용 공식 웹사이트입니다. 고객이 서비스 이해, 세탁 과정 확인, 전후 사례 확인, 가격 확인, 지점 선택, 예약 문의까지 자연스럽게 이동하도록 구성했습니다.

## 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS
- `next-sanity`
- `@sanity/image-url`
- Vercel 배포 기준

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버 실행 후 `http://localhost:3000`에서 확인합니다. 3000번 포트가 사용 중이면 Next.js가 다른 포트를 자동으로 사용합니다.

## 주요 경로

- `/` 메인 랜딩페이지
- `/services` 서비스 상세
- `/process` 세탁 과정
- `/pricing` 가격 안내
- `/branches` 지점 안내
- `/cases` 세탁 사례
- `/faq` 자주 묻는 질문
- `/contact` 예약 문의
- `/studio` Sanity Studio

## 환경변수

`.env.example`을 기준으로 `.env.local`을 생성합니다.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=
NEXT_PUBLIC_SITE_URL=https://example.com
```

`SANITY_API_READ_TOKEN`이 없어도 public dataset이면 읽기를 시도합니다. Sanity 설정이 비어 있거나 데이터가 없으면 mock 콘텐츠로 화면이 깨지지 않도록 구성했습니다.

## 콘텐츠 관리

Sanity Studio에서 다음 콘텐츠를 관리합니다.

- 사이트 설정, 홈 히어로
- 서비스, 세탁 과정, 가격
- 지점, 세탁 사례, 후기, FAQ
- 내비게이션, 법적 페이지

이미지 필드는 alt 텍스트를 함께 입력할 수 있습니다. 가격, 지점, 후기, 사례, FAQ는 `order` 또는 게시일 기준으로 정렬됩니다.

## 작업 기준

진행 상태는 [TODO.md](./TODO.md)를 기준으로 관리합니다. 클라이언트에게 받아야 하는 자료는 [CLIENT_CHECKLIST.md](./CLIENT_CHECKLIST.md)에 따로 정리합니다.

## 검증 명령

```bash
npm run lint
npm run build
```

현재 상태에서 `npm run lint`, `npm run build` 모두 통과했습니다.

## 배포 전 확인

- Vercel 환경변수 설정
- Sanity 프로젝트 ID와 dataset 연결
- 실제 도메인 기준 `NEXT_PUBLIC_SITE_URL` 설정
- 실제 사업자 정보와 개인정보처리방침 반영
- 실제 지점 연락처, 카카오톡, 블로그, 인스타그램 링크 반영
