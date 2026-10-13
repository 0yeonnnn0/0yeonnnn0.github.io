const HANGUL_CHARS_PER_MINUTE = 500;
const WORDS_PER_MINUTE = 200;
const HANGUL = /[가-힣]/g;

/** 코드 블록·MDX/마크다운 문법을 걷어낸 본문 텍스트 */
function stripMarkup(body: string): string {
  return body
    .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, ' ') // fenced code blocks
    .replace(/^(import|export)\s.*$/gm, ' ') // MDX import/export
    .replace(/<[^>]*>/g, ' ') // HTML/JSX tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/[#>*_~`|]/g, ' '); // remaining markdown syntax
}

/** 예상 읽기 시간(분). 한글은 글자 수, 그 외는 단어 수로 센다. 최소 1분. */
export function getReadingTime(body: string | undefined): number {
  if (!body) return 1;

  const text = stripMarkup(body);
  const hangulChars = text.match(HANGUL)?.length ?? 0;
  const otherWords = text
    .replace(HANGUL, ' ')
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9]/.test(word)).length;

  const minutes = hangulChars / HANGUL_CHARS_PER_MINUTE + otherWords / WORDS_PER_MINUTE;
  return Math.max(1, Math.ceil(minutes));
}
