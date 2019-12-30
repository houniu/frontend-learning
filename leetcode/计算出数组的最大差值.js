/*
 * 示例 1:
 * 输入 [5,10,11,7,8,9],
 * 输出 6
 */

const maxdiff = arr => {
  let minvalue = arr[0],
    maxprofit = 0;
  for (let item of arr) {
    minvalue = Math.min(minvalue, item);
    maxprofit = Math.max(item - minvalue, maxprofit);
  }
  return maxprofit;
};

export default {
  maxdiff,
};
