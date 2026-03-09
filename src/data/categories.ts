export const CATEGORIES = [
  '프로그래밍',
  '네트워크',
  '알고리즘',
  '프론트엔드',
  '백엔드',
  '데브옵스',
  '회고',
  '기타',
] as const;

export type Category = (typeof CATEGORIES)[number];
