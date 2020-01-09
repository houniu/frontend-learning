// https://www.bilibili.com/video/av63294045/?spm_id_from=333.788.videocard.1
/**
 * 核心思想：
 * 1. 判断left是否存在，如果存在则进入left节点
 * 2. 当left和right都为null时，则记录当前节点
 * 3. 当left节点为null时并且right存在时，则记录当前节点，然后跳到右节点
 * @param {*} root
 */
/* eslint-disable import/prefer-default-export */
export const inordertraversal = root => {
  if (!root) return [];
  let res = [],
    stack = [];
  while (root) {
    if (!root.left && !root.right) {
      res.push(root.val);
      root = stack.pop();
      root && (root.left = null);
    } else if (root.left) {
      stack.push(root);
      root = root.left;
    } else if (!root.left && root.right) {
      res.push(root.val);
      root = root.right;
    }
  }

  return res;
};
