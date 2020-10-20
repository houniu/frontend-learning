/*
 * [5] 最长回文子串
 *
 * https://leetcode.com/problems/longest-palindromic-substring/
 *
 * @description:
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 *
 * 示例1:
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 *
 * 示例2:
 * 输入: "cbbd"
 * 输出: "bb"
 */

/**
 * 判断是否是回文字符串
 * @param {String} str
 */
const isPalindrome = str => {
  let len = str.length,
    middleIndex = parseInt(len / 2);
  for (let i = 0; i < middleIndex; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
};

/**
 * 采用暴力枚举法
 * @param {*String} s
 */
export const longestPalindrome = s => {
  if (!s || s.length < 2) {
    return s;
  }
  let result = '',
    len = s.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j <= len; j++) {
      const temp = s.slice(i, j);
      if (
        temp
          .split('')
          .reverse()
          .join('') === temp &&
        temp.length > result.length
      ) {
        result = temp;
      }
    }
  }

  return result;
};

export default {
  isPalindrome,
  longestPalindrome,
};
