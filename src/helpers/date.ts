import * as moment from 'moment';

function now(format?: string) {
  return moment().utcOffset(-3).format(format);
}

function subtractFromNow(amount: moment.DurationInputArg1, unit: moment.DurationInputArg2) {
  return moment().utcOffset(-3).subtract(amount, unit).format();
}

function isValid(date: string, format = 'YYYY-MM-DD') {
  return moment(date, format, true).isValid();
}

function format(date: string, pattern: string) {
  return moment(date).format(pattern);
}

function utcDateNow() {
  return moment().utc().format();
}

export { now, subtractFromNow, isValid, format, utcDateNow };
