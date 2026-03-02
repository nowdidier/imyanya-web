
import moment from 'moment-timezone';
import 'moment/locale/en';

export const formatMessageDate = (timestamp) => {
  return moment(timestamp).calendar(null, {
    sameDay: '[Today] LT',
    lastDay: '[Yesterday] LT',
    lastWeek: 'DD/MM/YYYY LT',
    sameElse: 'DD/MM/YYYY LT',
  });
};
