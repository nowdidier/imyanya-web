
import moment from 'moment-timezone';
import 'moment-timezone/builds/moment-timezone-with-data';

moment.locale('rw', {
  calendar: {
    sameDay: '[Uyu munsi] LT',
    lastDay: '[Ejo hashize] LT',
    lastWeek: 'DD/MM/YYYY LT',
    sameElse: 'DD/MM/YYYY LT',
  },
});

export const formatMessageDate = (timestamp) => {
  return moment(timestamp).calendar(null, {
    sameDay: '[Uyu munsi] LT',
    lastDay: '[Ejo hashize] LT',
    lastWeek: 'DD/MM/YYYY LT',
    sameElse: 'DD/MM/YYYY LT',
  });
};