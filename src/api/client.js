import isPlainObject from 'lodash/isPlainObject';
import request from '@/common/request';
import { convertObjectToQueryParams } from '@/common/utils/url';

const client = Object.create(request);

// 将GET、HEAD的第二个参数默认调整为params
['get', 'head'].forEach(method => {
  client[method] = (url, params = {}, options = {}) =>
    request[method].call(client, url, {
      ...options,
      params,
    });
});

// 调整post、delete、patch的参数处理方式
// 默认使用x-www-form-urlencoded格式传参
// 如果指明使用json格式，则不进行处理，使用axios默认的数据处理方式
const methods = ['post', 'delete', 'patch'];
methods.forEach(method => {
  client[method] = (url, params = {}, options = {}) => {
    const dataType = options.dataType;
    if (isPlainObject(params) && dataType !== 'json') {
      params = convertObjectToQueryParams(params);
    }
    return request[method].call(client, url, params, options);
  };
});

export default client;
