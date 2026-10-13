const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Seoul',
});

/** 예: 2025년 1월 15일 (빌드 서버 시간대와 무관하게 한국 시간 기준) */
export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}
