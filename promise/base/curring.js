// 函数柯里化

// 判断变量的类型
// 判断类型 有四种方式 constructor instanceof typeof Object.prototype.toString.call

// const checkType = (content, type) => Object.prototype.toString.call(content) === `[object ${type}]`

// 什么叫函数柯里化 把一个函数的范围进行缩小 让函数变的更具体一些

function checkType(type) {
  // 私有化，这个函数 可以拿到上层函数的参数，这个空间不会被释放
  return function(content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
  };
}

let isString = checkType('string');

isString('hello');

// 通用的函数柯里化 希望分开传递参数
