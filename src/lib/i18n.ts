import strings from "@/data/strings.json";

export type Language = "ko" | "en";

interface I18nString {
  KO_KR: string;
  EN_US?: string;
}

interface I18nStrings {
  [key: string]: I18nString;
}

export async function getTranslations(lang: Language) {
  const translations = strings as I18nStrings;

  // 언어별로 적절한 값 반환
  const result: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(translations)) {
    if (lang === "en" && value.EN_US) {
      result[key] = value.EN_US;
    } else {
      result[key] = value.KO_KR; // 영어 번역이 없거나 한국어인 경우 KO_KR 사용
    }
  }

  return result;
}
