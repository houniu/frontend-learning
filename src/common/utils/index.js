import isPlainObject from 'lodash/isPlainObject';

const toString = Object.prototype.toString;

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
