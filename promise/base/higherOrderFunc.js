// 什么叫高阶函数 如果一个函数的参数是一个函数（回调函数）；一个函数返回一个函数 （函数柯里化）
// 写代码时我们希望不要破坏原有逻辑 而增加一些功能

// 对函数进行包装（装饰）切片编程（我们可以把核心逻辑抽离出来）包装上自己的内容 切片AOP
/* eslint-disable no-unused-vars */
const say = (...args) => {
  // 剩余运算符 可以将参数转换成一个数组
  // todo...
  /* eslint-disable no-console */
  console.log('说话');
};

// 希望在调用say方法之前做一些事
// Function.prototype 给每一个函数都扩展一些功能
Function.prototype.before = function(cb) {
  // 高阶函数
  const context = this;
  return function() {
    // const argsArr = Array.from(arguments);
    const argsArr = arguments;
    cb();
    // ...有两个作用 在箭头函数参数中 叫剩余运算符，展开运算符
    typeof context === 'function' && context(...argsArr);
  };
};

say.before(function(params) {
  /* eslint-disable no-console */
  console.log('before say');
})('a', 'b', 'c');
