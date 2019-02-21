function sum(a, b) {
  return a + b;
}
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

const arr = new Array();
const delay = 500;

// TODO 变量作用域的问题
for (var i = 0; i < 3; i++) {
  (async i => {
    arr[i] = function() {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            resolve(i);
          }, delay);
        } catch (error) {
          if (error) {
            reject(error.message || '未知错误');
          }
        }
      });
    };
  })(i);
}

arr.forEach(async function(fn) {
  const num = await fn();
  /* eslint-disable no-console */
  console.log(num);
});
