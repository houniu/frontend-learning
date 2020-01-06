const flat = Array.prototype.flat ? Array.prototype.flat : function() {};
const divider = ',';

(function() {
  function myFlat() {
    let result = [],
      _this = this;
    // 定义函数fn，循环arr中的每一项，把不是数组的存储到新数组中
    let fn = arr => {
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (Array.isArray(item)) {
          fn(item);
          continue;
        }
        result.push(item);
      }
    };

    fn(_this);
    return result;
  }

  Array.prototype.myFlat = myFlat;
})();

export const es6Flat = arr => flat.call(arr, Infinity);

export const convertArr = arr =>
  arr
    .toString()
    .splite(divider)
    .map(val => parseFloat(val));

/**
 * JSON.stringify可以扁平化数组
 * @param {*} arr
 */
export const jsonStrConvertArr = arr =>
  JSON.stringify(arr)
    .replace(/(\[|\])/g, '')
    .split(divider)
    .map(val => parseFloat(val));
