/**
 * 实现思路：
 * 1. 不传入第一个参数，那么上下文默认为 window
 * 2. 改变this指向，让新的对象可以执行该函数，并能接受参数
 */

Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
