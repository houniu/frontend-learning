import {
  stringify, // 将对象序列化
} from 'qs';

export const convertObjectToQueryParams = (data, options = {}) => {
  return stringify(
    data,
    Object.assign(
      {
        arrayFormat: 'repeat',
      },
      options
    )
  );
};

export default {
  convertObjectToQueryParams,
};
