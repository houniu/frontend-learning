/**
 *
 * @param {*} event
 * @param {*} time
 * @param {*} flag
 * 1. 在debounce函数中返回一个闭包，这里用的普通function，里面的setTimeout则用的箭头函数，这样做的意义是让this的指向准确，this的真实指向并非debounce的调用者，而是返回闭包的调用者
 * 2. 对传入闭包的参数进行透传
 */
export function debounce(event, time, flag) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    if (flag && !timer) {
      event.apply(this, args);
    }
    timer = setTimeout(() => {
      event.apply(this, args);
    }, time);
  };
}

export default {
  debounce,
};
