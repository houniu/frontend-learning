import isPlainObject from 'lodash/isPlainObject';

const toString = Object.prototype.toString;

/**
 * @function 类型检测：type
 * @param {Any} target
 * @param {String} type 对比类型，可不传。有参数返回值为对比后的Boolean，无参数返回值为实际的数据类型
 * @returns {Boolean|String}
 */
export const type = (target, type) => {
  let matchTargetType = '';
  let matchArr = Object.prototype.toString
    .call(target)
    .toLowerCase()
    .match(/\[object (\S*)\]/);
  if (matchArr && matchArr.length) {
    matchTargetType = matchArr[1];
  }
  return type === undefined ? matchTargetType : matchTargetType === type;
};

export const isString = str => typeof str === 'string';

export const isNumber = val => typeof val === 'number';

export const isArray = arr => {
  try {
    if (Array.isArray) {
      return Array.isArray(arr);
    } else {
      return toString.call(arr) === '[object Array]';
    }
  } catch (err) {
    return false;
  }
};

/**
 * JSON字符串反序列化
 * @param str jsonString
 * @param defaultValue 转化失败的默认值
 * @return {*}
 */

export const parseJsonString = (str, defaultValue = '') => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return defaultValue;
  }
};

const defaultPropsConverter = val => val;

export const pickDerivedStateFromProps = (
  keys = [],
  props,
  state = null,
  converter
) => {
  if (keys.some(key => key in props)) {
    if (!state) state = {};
    keys.forEach(key => {
      if (key in props) {
        let convert = defaultPropsConverter;
        if (typeof converter === 'function') convert = converter;
        if (isPlainObject(converter) && typeof converter[key] === 'function')
          convert = converter[key];

        state[key] = convert(props[key]);
      }
    });
    return state;
  }
};

export const deepCopy = source => {
  const result = {};
  for (var key in source) {
    result[key] =
      typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
  }
  return result;
};

/**
 * 会忽略 undefined
 * 会忽略 symbol
 * 不能序列化函数
 * 不能解决循环引用的对象
 * @param obj
 * @returns {any}
 */
// 简易深拷贝
export const deepClone = obj => JSON.parse(JSON.stringify(obj));

export const cloneDeep = obj => {
  const isObject = o => {
    return (typeof o === 'object' || typeof o === 'function') && o !== null;
  };
  if (!isObject(obj)) throw new Error('非对象');

  const isArray = Array.isArray(obj);
  const new_Obj = isArray ? [...obj] : { ...obj };
  Reflect.ownKeys(new_Obj).forEach(key => {
    new_Obj[key] = isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key];
  });

  return new_Obj;
};

~(function() {
  function myCall(context, ...args) {
    if (typeof this !== 'function') {
      throw new TypeError('error');
    }
    if (this === Function.prototype) {
      return undefined; // 用于防止 Function.prototype.myCall() 直接调用
    }

    context = context || window;
    let type = typeof context;
    // debugger;
    if (!/^(object|function)$/.test(type)) {
      if (/^(symbol|bigint)$/.test(type)) {
        context = Object(context);
      } else {
        context = new context.constructor(context);
      }
    }
    let key = Symbol('key'),
      result;
    context[key] = this;
    result = context[key](...args);
    delete context[key];
    return result;
  }

  Function.prototype.myCall = myCall;
})();

~(function() {
  function myApply(context, args) {
    if (typeof this !== 'function') {
      throw new TypeError('error');
    }
    if (this === Function.prototype) {
      return undefined; // 用于防止 Function.prototype.myCall() 直接调用
    }

    context = context || window;
    let type = typeof context;
    if (!/^(object|function)$/.test(type)) {
      if (/^(symbol|bigint)$/.test(type)) {
        context = Object(context);
      } else {
        context = new context.constructor(context);
      }
    }
    let key = Symbol('key'),
      result;
    context[key] = this;
    // 处理参数和 call 有区别
    if (Array.isArray(args)) {
      result = context[key](...args);
    } else {
      result = context[key]();
    }
    delete context[key];
    return result;
  }

  Function.prototype.myApply = myApply;
})();

/**
 * JS 中让对象支持 for of 遍历以及迭代器
 */
(function() {
  Object.prototype[Symbol.iterator] = function() {
    let _this = this;
    const keys = Object.keys(_this); // keys = Object.getOwnPropertyNames(this);
    let index = 0;
    return {
      next: () => {
        return {
          value: _this[keys[index++]], // 每次迭代的结果
          done: index > keys.length, // 迭代结束标识 done为true时候遍历结束
        };
      },
    };
  };
})();

Function.prototype.myBind = function(context) {
  if (typeof this !== 'function')
    throw new TypeError(
      'Function.prototype.bind - what is trying to be bound is not callable'
    );
  if (this === Function.prototype) throw new TypeError('error');
  // 保存this
  const _this = this;
  const args = [...arguments].slice(1); // args = Array.prototype.slice.call(arguments, 1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断是否用于构造函数
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

/**
 * es6使用reduce实现map
 */
~(function() {
  Array.prototype.reduceToMap = function(handler) {
    return this.reduce((target, current, index) => {
      target.push(handler.call(this, current, index));
      return target;
    }, []);
  };
})();

/**
 * es6使用reduce实现filter
 */
Array.prototype.reduceToFilter = function(handler) {
  return this.reduce((target, current, index) => {
    let result = handler.call(this, current, index);
    if (result) {
      target.push(current);
    }
    return target;
  }, []);
};

/**
 * 打印数组每一项
 * params Array
 */
export const logArrItem = (arr = [], wait) => {
  let len = 0;
  while (len < arr.length) {
    (function(index) {
      setTimeout(() => {
        // console.log(arr[index])
      }, wait * (index + 1));
    })(len);
    ++len;
  }
};

/**
 * 多维数组转换一维数组
 * @param array
 * @return {Array}
 */
export const convertArr = arr => {
  if (!isArray(arr))
    throw new TypeError('Cannot convert first argument to Array');
  return (arr.toString() || '').split(',').map(item => +item);
};
/**
 * 深度合并对象
 * @params object
 * @return {Object}
 */
// export const deepObjectMerge = (firstObject, secondObject) => {
//
// }

/**
 * 实现 new 操作符
 * 1. 首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
 * 2. 然后内部创建一个空对象 obj
 * 3. 因为 obj 对象需要访问到构造函数原型链上的属性，所以我们通过 setPrototypeOf 将两者联系起来。这段代码等同于 obj.__proto__ = Con.prototype
 * 4. 将 obj 绑定到构造函数上，并且传入剩余的参数
 * 5. 判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 obj，这样就实现了忽略构造函数返回的原始值
 */
export const create = (Con, ...args) => {
  let obj = {};
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj, args);
  return result instanceof Object ? result : obj;
};

/**
 * instanceof 的原理
 * 1. 首先获取类型的原型
 * 2. 然后获得对象的原型
 * 3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null
 */
export const myInstanceof = (left, right) => {
  let prototype = right.prototype;
  left = left.__proto__;
  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    if (left === prototype) {
      return true;
    }
    if (left === null || left === undefined) {
      return false;
    }
    left = left.__proto__;
  }
};

/**
 * 去重【开辟一个外部存储空间用于标示元素是否出现过】
 * @param {*} array
 */
export const unique = array => {
  const container = {};
  return array.filter(item =>
    container.hasOwnProperty(item) ? false : (container[item] = true)
  );
};

/**
 * javascript 不使用循环，创建一个长度为count的数组，且数组的每一项都为str
 * @param {*} count
 * @param {*} str
 */
export const createArr = (count, str) => {
  const arr = new Array();

  const addEle = (num, str) => {
    if (num !== 0) {
      arr.push(str);
      num--;
      addEle(num, str);
    }
  };
  addEle(count, str);

  return arr;
};

export const once = fn => {
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    throw new TypeError('fn must be a function');
  }
  let count = 0;
  return function() {
    count++;
    if (count === 1) {
      return fn.apply(this, [...arguments]);
    }
  };
};

export const strFormat = (str = '', divider) => {
  let arr = str
    .toString()
    .split('')
    .reverse();
  let res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(divider);
    }
    res.push(arr[i]);
  }
  return res.length && res.reverse().join('');
};

/**
 * 将数字格式化成每 3 位添加一个逗号
 * @param {Number} money 待格式化的金额
 * @return {String} 返回格式化后的数字
 */
export const $wFormatBoth = num => {
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};

export const toThousands = (num, decollator = ',') => {
  // '1234,567'
  const numArr = (num || 0).toString().split('.');
  let result = '',
    otherNum = '';
  if (numArr.length === 2) {
    otherNum = numArr[1];
  }
  num = numArr[0];
  while (num.length > 3) {
    result = decollator + num.slice(-3) + result;
    // result += decollator + num.slice(-3);
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  if (otherNum) {
    result += '.' + otherNum;
  }
  return result;
};
