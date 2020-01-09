/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 核心思想：依赖javascript强大的字符串处理能力，将每个路径存成一个字符串，然后再相加
 * @param {TreeNode} root
 * @return {number}
 */

export const sum = function(root, s, res) {
  if (!root) {
    return;
  }
  if (!root.left && !root.right) {
    res.push(s + root.val);
    s = '';
  }
  sum(root.left, s + root.val, res);
  sum(root.right, (s = root.val), res);
};

export const sumNumbers = function(root) {
  if (!root) {
    return 0;
  }
  var res = [];
  sum(root, '', res);
  return res.reduce((sum, item) => sum + parseInt(item), 0);
};
