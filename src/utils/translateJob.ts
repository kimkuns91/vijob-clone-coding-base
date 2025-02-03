import { IJob } from '@/interface';
import { translateText } from './translate';

export async function translateJobData(
  jobData: IJob, 
  targetLang: 'ko' | 'en'
): Promise<IJob> {
  const translatedData = { ...jobData };

  // 비즈니스 정보 번역
  if (translatedData.business) {
    translatedData.business = {
      ...translatedData.business,
      name: await translateText(translatedData.business.name, targetLang),
      ownerName: await translateText(translatedData.business.ownerName, targetLang),
    };
  }

  // 주소 정보 번역 (상세 주소만 번역)
  if (translatedData.address) {
    translatedData.address = {
      ...translatedData.address,
      addressDetail: await translateText(translatedData.address.addressDetail, targetLang),
    };
  }

  return translatedData;
} 