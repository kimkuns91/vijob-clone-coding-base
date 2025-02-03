import { IJob } from '@/interface';
import { enUS } from 'date-fns/locale';
import { isPast } from 'date-fns';
import { ko } from 'date-fns/locale';

export const useDateFormat = (locale: string) => {
  const dateFormat = locale === 'ko' ? 'yyyy.MM.dd (E)' : 'M.d.yyyy (EEE)';
  const dateLocale = locale === 'ko' ? ko : enUS;

  return { dateFormat, dateLocale };
};

export function useDeadlineText(
  job: IJob | null,
  t: (key: string) => string
): string {
  if (!job) return '';
  const isDeadlinePassed = job.endDate ? isPast(job.endDate) : false;
  return isDeadlinePassed
    ? t('closed')
    : job.isClosed
    ? t('closed')
    : t('closingOfRecruitment');
}
