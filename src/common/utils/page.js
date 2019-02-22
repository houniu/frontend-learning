import { parseJsonString } from './index';

const getPageModel = () => {
  const pageMeta = document.querySelector("meta[name='pageModel']");
  if (pageMeta) {
    const content = pageMeta.getAttribute('content');
    if (content) {
      return parseJsonString(content, {});
    }
  }
  return {};
};

export const PageModel = (window.PageModel = getPageModel());

const defaultPageLeaveHook = e => {
  e = e || window.event;

  // 兼容IE8和Firefox 4之前的版本
  if (e) {
    e.returnValue = '关闭提示';
  }

  // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
  return '关闭提示';
};

export const setupPageLeaveHook = hook => {
  const cache = window.onbeforeunload;
  window.onbeforeunload = hook || defaultPageLeaveHook;
  return cache;
};
