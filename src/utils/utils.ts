import { I18N_CONFIG } from '~/utils/config';

const formatter =
  I18N_CONFIG?.dateFormatter ||
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

/* eslint-disable no-mixed-spaces-and-tabs */
export const getFormattedDate = (date: Date) =>
  date
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      formatter.format(date)
    : '';

export const trim = (str = '', ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};
