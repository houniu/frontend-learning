export const findMaxStr = (str = '') => {
  const result = {};
  for (let i = 0, len = str.length; i < len; i++) {
    let chars = String(str).charAt(i);
    if (result[chars]) {
      result[chars]++;
    } else {
      result[chars] = 1;
    }
  }
  let maxNum = 0,
    maxKey = '';
  for (let key in result) {
    if (result[key] > maxNum) {
      maxNum = result[key];
      maxKey = key;
    }
  }

  return {
    maxKey,
    maxNum,
  };
};

export const moreValue = (str = '') => {
  const result = {};
  let maxNum = 0,
    maxValue = '';
  for (let i = 0, len = str.length; i < len; i++) {
    let chars = String(str).charAt(i);
    result[chars] === undefined ? (result[chars] = 1) : result[chars]++;
    if (result[chars] > maxNum) {
      maxNum = result[chars];
      maxValue = chars;
    }
  }

  return {
    maxValue,
    maxNum,
  };
};

export default {
  findMaxStr,
  moreValue,
};
