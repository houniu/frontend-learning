/*
 * @description:
 * 在一个二维数组中（每个一维数组的长度相同），
 * 每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数
 *
 */

/* [[1,2,3], [4,5,6], [7,8,9]] => 5
 * ac地址：https://www.nowcoder.com/practice/abc3fe2ce8e146608e868a70efebf62e
 * 原文地址：https://xxoo521.com/2019-12-19-er-wei-shu-zu-cha-zhao/
 */
export const find = (target, array) => {
  const rowNum = array.length;
  if (!rowNum) return false;
  const colNum = array[0].length;
  if (!colNum) return false;
  let row = 0,
    col = colNum - 1;
  while (row < rowNum && col >= 0) {
    if (array[row][col] === target) {
      return true;
    } else if (array[row][col] > target) {
      --col;
    } else {
      ++row;
    }
  }

  return false;
};

export default {
  find,
};
