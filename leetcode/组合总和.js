/*
 * [39] 组合总和
 *
 * https://leetcode.com/problems/combination-sum/
 *
 * @description:
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * candidates 中的数字可以无限制重复被选取
 * 说明：
 *  1. 所有数字（包括 target）都是正整数。
 *  2. 解集不能包含重复的组合。
 *
 * 示例 1:
 * 输入: candidates = [2,3,6,7], target = 7
 * 所求解集为:[[7],[2,2,3]]
 *
 * 示例 2:
 * 输入: candidates = [2,3,5], target = 8,
 * 所求解集为:[[2,2,2,2],[2,3,3],[3,5]]
 */

/**
 * @param {Array} candidates
 * @param {number} target
 * @returns {Array}
 */
export const combinationSum = (candidates = [], target) => {
  let solutionSet = [];
  // sorting allows us to ignore remaining items in the candidates list if we exceed target when trying to build a solution set since we know numbers to the right will always be higher
  let list = candidates.sort((left, right) => left - right);
  const len = list.length;

  const backtrack = (arr, i, rem) => {
    // if remaining amount is 0, we have found a set that adds up to target, so push set to solution set
    if (rem === 0) {
      solutionSet.push(arr);
      return;
    } else {
      // iterate through all numbers in candidates
      for (let j = i; j < len; j++) {
        // if adding element will exceed target, don't bother checking numbers to the right
        if (rem - list[j] < 0) break;

        // go down path where current element is added
        arr.push(list[j]);
        backtrack([...arr], j, rem - list[j]);

        // backtrack
        arr.pop();
      }
    }
  };

  backtrack([], 0, target);
  return solutionSet;
};

export default {
  combinationSum,
};
