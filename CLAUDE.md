# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

개인 블로그 "Liminal Space" (https://0yeonnnn0.github.io). 따뜻한 아이보리/웜블랙 톤, 절제된 인터랙션, 라이트/다크 테마가 디자인의 핵심.

## Commands

- `npm run dev` — 개발 서버 (localhost:4321)
- `npm run build` — 정적 빌드 (dist/)
- `npm run preview` — 빌드 결과 미리보기

## Tech Stack

- **Astro 5** (정적 사이트 생성), 클라이언트 JS는 최소한으로
- **Tailwind CSS v4** (Vite 플러그인 방식, `@tailwindcss/vite`) + `@tailwindcss/typography` (`prose`, 색상 토큰으로 테마 적용)
- **MDX** (Content Collections)
- **TypeScript** (strict)
- 배포: GitHub Pages via GitHub Actions (`main` push → 자동 배포)

## Structure

FSD(Feature-Sliced Design)에서 영감을 받은 가벼운 레이어 구조이며, 엄격한 FSD가 아니다. 레이어 규칙을 강제하지 말고 기존 배치를 따를 것.

```
src/
├── app/
│   ├── layouts/BaseLayout.astro
│   └── styles/global.css     # 디자인 토큰(@theme), 다크 오버라이드(:root[data-theme="dark"])
├── pages/                    # 파일 기반 라우팅: rss.xml.ts, categories/, tags/, books/, posts/
├── widgets/                  # header, hero, footer, seo, post-list(PostList, PostListItem),
│                             # book-list(BookCover 포함), steady-sellers
├── features/theme/           # ThemeToggle.astro, theme.ts(get/set/apply 헬퍼)
├── shared/
│   ├── config/site.ts        # 사이트 메타정보
│   ├── lib/                  # posts.ts(getPublishedPosts), date.ts(formatDate, Asia/Seoul), reading-time.ts
│   └── ui/PageTitle.astro
├── content/                  # posts/, books/ (MDX)
├── data/                     # categories.ts(카테고리 enum), steady-sellers.ts(큐레이션 slug)
└── content.config.ts         # Content Collections 스키마
```

**Import convention:** `@/` → `src/` (tsconfig paths)

## Fonts

- 본문: Liminal Batang (KoPub바탕체 KS X 1001 서브셋, 라이선스상 개명; `public/fonts`에 자체 호스팅)
- 디스플레이/타이틀: Cormorant Garamond (`@fontsource`)
- UI: Pretendard (`pretendard` 패키지, dynamic subset)
- 코드: JetBrains Mono (`@fontsource-variable`)

## Key Conventions

- 디자인 토큰은 `global.css`의 `@theme` 블록(CSS 변수)에서 관리. 색상은 `text-[var(--color-…)]`처럼 변수로 참조하고 하드코딩하지 않는다. 다크 값은 `:root[data-theme="dark"]`에서 덮어쓴다.
- 색상: 순수 흰/검정 대신 웜톤 (`#FAF9F5`, `#2C2B28`)
- 간격: Tailwind 기본 스케일을 그대로 사용. `@theme`에 `--spacing-*` 토큰을 정의하지 말 것 (유틸리티를 덮어써 스케일이 깨진 적이 있음).
- 글은 항상 `getPublishedPosts()` (`shared/lib/posts.ts`)로 가져온다. `getCollection('posts')`를 직접 쓰지 않는다. `draft: true`는 dev에서만 보이고 프로덕션에서는 제외된다.
- content 폴더에서 `_`로 시작하는 파일은 무시된다 (템플릿용).
- 카테고리는 `src/data/categories.ts`에서 enum으로 관리
- 인기글은 `src/data/steady-sellers.ts`에서 slug 목록으로 수동 큐레이션
- frontmatter: title, date, category(enum), tags, description, draft?, thumbnail?(상대 경로, `astro:assets`), series?, seriesOrder? (`series`는 `src/content/books`의 slug). `views` 필드는 쓰지 않는다.

## Behavioral Guidelines

**Think before coding:** 불확실하면 먼저 물어볼 것. 여러 해석이 가능하면 제시할 것.

**Simplicity first:** 요청된 것만 구현. 단일 사용 코드에 추상화 금지. 200줄이 50줄로 가능하면 다시 쓸 것.

**Surgical changes:** 수정 요청받은 부분만 변경. 인접 코드 "개선" 금지. 기존 스타일 유지.

**Goal-driven:** 작업을 검증 가능한 목표로 변환. 다단계 작업은 간략한 계획 수립 후 진행.
