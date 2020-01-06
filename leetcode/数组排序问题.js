// 冒泡排序
export const bubble = () => {};

// 快速排序
/**
 * 核心思想：递归
 * @param {*} arr
 */
export const quick = arr => {
  // 4.结束递归（当arr小于等于一项，则不用处理）
  if (arr.length <= 1) {
    return arr;
  }

  // 1.找到数组中的中间项，在原有数组中移除
  const middleValue = arr.splice(Math.floor(arr.length / 2), 1)[0];

  // 2.准备左右两个数组，循环剩下数组中的每一项，比当前小的放到左边数组中，反之放到右边数组中
  const leftArr = [],
    rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    item < middleValue ? leftArr.push(item) : rightArr.push(item);
  }

  // 3.递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止（最后让左边+中间+右边拼接成为最后的结果）
  return quick(leftArr).concat(middleValue, quick(rightArr));
};
