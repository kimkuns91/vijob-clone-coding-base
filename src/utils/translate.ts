'use client';

type SupportedLanguage = 'ko' | 'en';

export async function translateText(
  text: string,
  targetLang: SupportedLanguage
): Promise<string> {
  // 이미 대상 언어인 경우 번역하지 않음
  if (
    (targetLang === 'ko' && containsOnlyKorean(text)) ||
    (targetLang === 'en' && containsOnlyEnglish(text))
  ) {
    return text;
  }

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang }),
    });

    if (!response.ok) throw new Error('Translation failed');

    const { translation } = await response.json();
    return translation || text;
  } catch (error) {
    console.error('Translation failed:', error);
    return text; // 실패 시 원본 텍스트 반환
  }
}

// 한글만 포함되어 있는지 확인하는 헬퍼 함수
function containsOnlyKorean(text: string): boolean {
  const koreanPattern = /^[가-힣\s.,!?()]*$/;
  return koreanPattern.test(text);
}

// 영어만 포함되어 있는지 확인하는 헬퍼 함수
function containsOnlyEnglish(text: string): boolean {
  const englishPattern = /^[a-zA-Z\s.,!?()]*$/;
  return englishPattern.test(text);
}
