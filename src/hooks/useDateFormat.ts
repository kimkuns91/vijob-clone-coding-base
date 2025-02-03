import { IJob } from '@/interface';
import { enUS } from 'date-fns/locale';
import { isPast } from 'date-fns';
import { ko } from 'date-fns/locale';

export const useDateFormat = (locale: string) => {
  const dateFormat = locale === 'ko' ? 'yyyy.MM.dd (E)' : 'M.d.yyyy (EEE)';
  const dateLocale = locale === 'ko' ? ko : enUS;

  return { dateFormat, dateLocale };
};

export const useDeadlineText = (job: IJob, t: (key: string) => string) => {
  const isDeadlinePassed = job.endDate ? isPast(job.endDate) : false;
  return isDeadlinePassed
    ? t('closed')
    : job.isClosed
    ? t('closed')
    : t('closingOfRecruitment');
};
