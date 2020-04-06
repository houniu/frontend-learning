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

export default {
  findMaxStr,
};
