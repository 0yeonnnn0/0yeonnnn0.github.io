// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://0yeonnnn0.github.io',
  integrations: [mdx(), sitemap()],
  markdown: {
    // 라이트/다크 테마별 코드 색을 CSS 변수로 출력 (global.css에서 data-theme에 맞춰 선택)
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
