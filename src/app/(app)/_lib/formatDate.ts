import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export const formatDate = (date: Date) => {
  dayjs.extend(advancedFormat);
  return dayjs(date).format('HH:mm MMMM Do, YYYY');
};
