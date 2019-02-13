let callbackIndex = 0;
const toString = Object.prototype.toString;

function serialize(obj) {
  // 不是对象不做转换
  if (toString.call(obj) !== '[object Object]') {
    return obj;
  }
  return (Object.keys(obj).map(key => `${key}=${obj[key]}`) || []).join('&');
}

export function jsonp(url, params, timeout = 5000) {
  const cbName = `jp${++callbackIndex}`;
  const script = document.createElement('script');
  document.body.appendChild(script);
  script.setAttribute('src', `${url}?callback=${cbName}&${serialize(params)}`);
  return new Promise((resolve, reject) => {
    const error = err => {
      over();
      reject(err);
    }
    const over = () => {
      window[cbName] = undefined;
      script.removeEventListener('error', error);
      document.body.removeChild(script);
    }
    let to = null;
    to = setTimeout(() => {
      over();
      reject(new Error('timeout'));
    }, timeout)
    script.addEventListener('error', error);
    window[cbName] = data => {
      if (to) {
        clearTimeout(to);
        to = null;
      }
      if (data) {
        resolve(data);
        over();
      }
    }
  })
}
