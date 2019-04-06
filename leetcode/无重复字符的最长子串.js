/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [2] 无重复字符的最长子串
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度
 *
 * 示例1:
 *
 * 输入: "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 * 示例 2:
 * 输入: "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 * 示例 3:
 * 输入: "pwwkew"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */

/**
 * @param {string} s
 * @return {number}
 */
// 时间复杂度: O(n) - One-pass Hash Table
const lengthOfLongestSubstring = s => {
  if (!s.length) return 0;
  if (s.length === 1) return 1;
  let arr = [],
    now = '';
  for (let c of s) {
    let i = now.indexOf(c);
    if (i > -1) {
      arr[now.length - 1] = now;
      now = now.substring(i + 1, now.length);
    }
    now += c;
  }
  arr[now.length - 1] = now;
  return Array.isArray(arr) && arr.length;
};

export default {
  lengthOfLongestSubstring,
};
