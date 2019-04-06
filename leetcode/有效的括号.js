/*
 * [20] 有效的括号
 *
 * https://leetcode.com/problems/valid-parentheses/
 *
 * @description:
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
 *  1. 左括号必须用相同类型的右括号闭合。
 *  2. 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 *
 * 示例1:
 * 输入: "()"
 * 输出: true
 *
 * 示例2:
 * 输入: "()[]{}"
 * 输出: true
 *
 * 示例 3:
 * 输入: "(]"
 * 输出: false
 *
 * 示例 4:
 * 输入: "([)]"
 * 输出: false
 *
 * 示例 5:
 * 输入: "{[]}"
 * 输出: true
 *
 *
 * @mentality: 利用栈的思想去解决
 * 模拟stack，因此将字符串顺序读取一遍，要么入栈要么出栈，当出现左括号就入栈，
 * 当出现右括号并且栈顶括号无法匹配成一对就入栈，当右括号可以和栈顶配对就把栈顶出栈。
 * 一种特殊情况是，只有一个字符时比如']'，栈为空没有栈顶元素，会报错超出索引范围，就随便用一个字符比如1，
 * 代替，最后跟这个字符进行比较就可以了，得到最终的结果
 */

export const isString = str => typeof str === 'string';
/**
 * @param {string} s
 * @return {boolean}
 */
export const isValid = s => {
  if (!s) return true;
  let stack = [];
  if (isString(s)) {
    for (let x of s) {
      if (x === '') continue;
      if (stack.length < 1) {
        stack.push(x);
      } else if (
        (stack[stack.length - 1] === '(' && x === ')') ||
        (stack[stack.length - 1] === '{' && x === '}') ||
        (stack[stack.length - 1] === '[' && x === ']')
      ) {
        stack.pop();
      } else {
        stack.push(x);
      }
    }
    return stack.length < 1;
  }
  return false;
};

export default {
  isString,
  isValid,
};
