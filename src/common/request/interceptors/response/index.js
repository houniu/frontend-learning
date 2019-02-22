const delay = 1000;

const resolver = response => {
  const { data } = response;
  if (data && data.code !== undefined) {
    switch (data.code) {
      case 0:
        return data.data;
      case 301:
      case 302:
        location.href = data.location;
        return Promise.reject({
          code: data.code,
          message: data.msg,
        });
      case 401:
        setTimeout(() => {
          // logout & goToSsoLogin
          // TODO 增加40x的拦截 实现登录后跳转回来
          location.href = `/401cb=${encodeURIComponent(location.href)}`;
        }, delay);

        return Promise.reject({
          code: data.code,
          message: data.msg || 'Request authorize failed',
        });
      case 404: // 接口资源不存在
        return Promise.reject({
          code: data.code,
          message: data.msg || '请求接口不存在',
        });
      case 1: // 接口调用失败
      case 500:
        return Promise.reject({
          code: data.code,
          message: data.msg,
        });
      default:
        if (process && process.env && process.env.NODE_ENV === 'local') {
          return data.data;
        } else {
          Promise.reject({
            code: data.code,
            message: data.msg || `unhandled response data(code: ${data.code})`,
          });
        }
    }
  }
  return response;
};

const rejector = error => Promise.reject(error.message || error);

export { resolver, rejector };
