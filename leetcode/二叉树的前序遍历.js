// 递归
export const preorderTraversalRecursion = root => {
  if (!root) return [];
  let res = [root.val];
  if (root.left) {
    res.push(...preorderTraversalRecursion(root.left));
  }

  if (root.right) {
    res.push(...preorderTraversalRecursion(root.right));
  }

  return res;
};

// 非递归【迭代算法】
/**
 * 核心思想：根据栈的特点:先进的后出
 */

export const preorderTraversalNoRecursion = root => {
  if (!root) return [];
  let stack = [],
    res = [];
  while (root) {
    // 跳出直到为null
    res.push(root.val);
    if (root.right) stack.push(root.right);
    if (root.left) stack.push(root.left);
    root = stack.pop();
  }

  return res;
};
