import axios from 'axios';
import * as responseInterceptor from './interceptors/response';
import { PageModel } from '@/common/utils/page';

const instance = axios.create({
  baseURL: (PageModel.prefix || '') + '/',
  timeout: 5000,
  validateStatus(status) {
    return status >= 200 && status < 600;
  },
});
// TODO 前端自定义接口响应拦截
instance.interceptors.response.use(
  responseInterceptor.resolver,
  responseInterceptor.rejector
);

export default instance;
