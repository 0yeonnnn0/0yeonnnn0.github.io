// Shared with the inline <head> script in BaseLayout (keep key/colors in sync).
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

const THEME_COLORS: Record<Theme, string> = {
  light: '#FAF9F5',
  dark: '#1F1E1C',
};

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode etc.) — the choice just won't persist.
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}
