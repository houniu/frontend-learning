/**找出非降序数列的个数
 * 问题描述：【输入】：['cba', 'daf', 'ghi', 'wie', 'sea'] 【输出】:2
 *
 */
export const minDeletionSize_one = strArr => {
  if (!strArr.length) return 0;
  let count = 0;
  strArr.forEach(val => {
    let itemArr = String(val).split('');
    for (let i = 0, len = itemArr.length; i < len; i++) {
      if (itemArr[i + 1] && itemArr[i] < itemArr[i + 1]) {
        count++;
        break;
      }
    }
  });
  return count;
};

export const minDeletionSize = strArr => {
  const isDsc = str => {
    for (let i = 1, len = String(str).length; i < len; ++i) {
      let c1 = str.charAt(i - 1);
      let c2 = str.charAt(i);
      if (c1 < c2) {
        return false;
      }
    }
    return true;
  };
  return strArr.filter(str => !isDsc(str)).length;
};

export default {
  minDeletionSize_one,
  minDeletionSize,
};
