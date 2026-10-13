# Liminal Space

경계에서 바라보는 기술과 생각의 기록. Astro로 만든 개인 블로그입니다.
https://0yeonnnn0.github.io

## 스택

- Astro 5 (정적 사이트 생성) + MDX (Content Collections)
- Tailwind CSS v4 (`@tailwindcss/vite`, 글 본문은 `@tailwindcss/typography`)
- TypeScript (strict)
- GitHub Pages 배포 (GitHub Actions, `main` push 시 자동 배포)

## 명령어

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (http://localhost:4321) |
| `npm run build` | 정적 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 미리보기 |

## 글 쓰기

`src/content/posts/`에 `.mdx` 파일을 추가합니다. 파일명이 URL slug가 됩니다.

```mdx
---
title: "글 제목"
date: 2026-03-08
category: "프로그래밍"
tags: ["Astro", "블로그"]
description: "목록과 SEO에 쓰이는 한 줄 설명"
draft: false
---

본문
```

| 필드 | 설명 |
| --- | --- |
| `title`, `date`, `description` | 필수 |
| `category` | 필수. `src/data/categories.ts`의 목록 중 하나 |
| `tags` | 문자열 배열 (기본값 `[]`) |
| `draft` | `true`면 초안 (기본값 `false`) |
| `thumbnail` | 선택. 글 파일 기준 상대 경로 이미지 (`astro:assets`로 처리) |
| `series`, `seriesOrder` | 선택. `src/content/books/`의 책 파일명(slug)과 그 안에서의 순서 |

### 초안

`draft: true`인 글은 `npm run dev`에서는 보이지만 프로덕션 빌드(목록, 태그, RSS, 사이트맵 포함)에서는 제외됩니다.

### 템플릿

content 폴더 안에서 `_`로 시작하는 파일은 무시됩니다. 템플릿이나 메모를 두는 용도로 쓰세요.

## 기타

- RSS: `/rss.xml`
- 다크 모드: 헤더의 토글로 전환 (라이트/다크 테마)
