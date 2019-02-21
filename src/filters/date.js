import Vue from 'vue';

const toString = Object.prototype.toString;
function isDate(value) {
  return toString.call(value) === '[object Date]';
}

const formatMap = {
  yyyy: date => date.getFullYear(),
  YYYY: date => date.getFullYear(),
  MM: date => ('0' + (date.getMonth() + 1)).slice(-2),
  M: date => date.getMonth() + 1,
  dd: date => ('0' + date.getDate()).slice(-2),
  DD: date => ('0' + date.getDate()).slice(-2),
  d: date => date.getDate(),
  D: date => date.getDate(),
  HH: date => ('0' + date.getHours()).slice(-2),
  H: date => date.getHours(),
  mm: date => ('0' + date.getMinutes()).slice(-2),
  m: date => date.getMinutes(),
  ss: date => ('0' + date.getSeconds()).slice(-2),
  s: date => date.getSeconds(),
};
const replaceToken = /y{4}|Y{4}|M{1,2}|d{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}/g;

/**
 * value为unix时间戳（10位）
 */
export default Vue.filter('date', function(value, format) {
  if (value == null) {
    return null;
  }
  const date = isDate(value) ? value : new Date(value * 1000);
  const invalid = date.toString();
  if (invalid === 'Invalid Date') {
    return invalid;
  }

  const result = format.replace(replaceToken, part => {
    const fn = formatMap[part];
    if (fn) {
      return fn(date);
    }
    return part;
  });
  return result;
});
