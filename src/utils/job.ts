import { IJobCategory } from "@/interface";

/**
 * 카테고리 ID에 해당하는 한국어 카테고리명을 반환합니다.
 */
export const getCategoryName = (
  categoryId: number | undefined,
  jobCategories: IJobCategory[]
): string => {
  if (!categoryId) return "";
  return (
    jobCategories.find((category) => category.id === categoryId)?.i18nNames
      .KO_KR || ""
  );
};

/**
 * 주소에서 동/읍/면 단위를 추출합니다.
 */
export const getLocationName = (address: string): string => {
  const matches = address.match(/[가-힣]+(동|읍|면)$/);
  return matches ? matches[0] : address;
};
