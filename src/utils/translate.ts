import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a translator. Translate the following text to ${targetLang === 'en' ? 'English' : 'Korean'}. Keep the translation natural and contextual.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content || text;
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