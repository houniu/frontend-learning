import isPlainObject from 'lodash/isPlainObject';

export const isString = str => typeof str === 'string';

export const isNumber = val => typeof val === 'number';

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
