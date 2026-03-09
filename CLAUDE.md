# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Evan Moon 블로그(evan-moon.github.io) 스타일의 개인 블로그. 따뜻한 톤의 아이보리/웜블랙 디자인, 절제된 인터랙션이 핵심.

## Commands

- `npm run dev` — 개발 서버 (localhost:4321)
- `npm run build` — 정적 빌드 (dist/)
- `npm run preview` — 빌드 결과 미리보기

## Tech Stack

- **Astro** (정적 사이트 생성) + **React** (인터랙티브 컴포넌트)
- **Tailwind CSS v4** (Vite 플러그인 방식, `@tailwindcss/vite`)
- **MDX** (Content Collections)
- **TypeScript** (strict)
- 배포: GitHub Pages via GitHub Actions (`main` push → 자동 배포)

## Architecture (FSD — Feature-Sliced Design)

```
src/
├── app/              # 앱 레벨: 레이아웃, 글로벌 스타일
│   ├── layouts/      # BaseLayout.astro
│   └── styles/       # global.css (디자인 토큰, @font-face)
├── pages/            # Astro 라우팅 (파일 기반)
├── widgets/          # 독립적 UI 블록 (header, footer, hero, post-list, seo, toc, steady-sellers)
├── features/         # 사용자 인터랙션 기능 (theme 등)
├── entities/         # 비즈니스 엔티티 (post, category)
├── shared/           # 공유 코드
│   ├── config/       # site.ts (사이트 메타정보)
│   ├── ui/           # 공통 UI 컴포넌트
│   └── lib/          # 유틸리티 함수
├── content/          # MDX 포스트 파일
├── data/             # categories.ts, steady-sellers.ts
└── content.config.ts # Content Collections 스키마
```

**Import convention:** `@/` → `src/` (tsconfig paths)

## Key Conventions

- 디자인 토큰은 CSS 변수로 관리 (`src/app/styles/global.css`의 `@theme` 블록)
- 색상: 순수 흰/검정 대신 웜톤 사용 (`#FAF9F5`, `#2C2B28`)
- 간격: 8px 배수 시스템
- 폰트: 본문 KoPub Batang(serif), 타이틀 Cormorant Garamond(display), UI Pretendard(sans-serif), 코드 JetBrains Mono
- 카테고리는 `src/data/categories.ts`에서 enum으로 관리
- 인기글은 `src/data/steady-sellers.ts`에서 slug 목록으로 수동 큐레이션
- frontmatter: title, date, category(enum), tags, description, draft?, thumbnail?, series?

## Behavioral Guidelines

**Think before coding:** 불확실하면 먼저 물어볼 것. 여러 해석이 가능하면 제시할 것.

**Simplicity first:** 요청된 것만 구현. 단일 사용 코드에 추상화 금지. 200줄이 50줄로 가능하면 다시 쓸 것.

**Surgical changes:** 수정 요청받은 부분만 변경. 인접 코드 "개선" 금지. 기존 스타일 유지.

**Goal-driven:** 작업을 검증 가능한 목표로 변환. 다단계 작업은 간략한 계획 수립 후 진행.
