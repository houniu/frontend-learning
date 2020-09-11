/* eslint-disable no-console */
const PENDING = 'PENDING'; // 等待态
const FULFILLED = 'FULFILLED'; // 成功态
const REJECTED = 'REJECTED'; // 失败态
const resolvePromise = (promise2, x, resolve, reject) => {
  // 判断 可能你的promise要和别人的promise混用
  // 可能不同的promise库之间要相互调用
  if (promise2 === x) {
    // x 如果和 promise2是同一个 x 永远不能成功，所以就卡死，我们需要直接报错即可
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }
  // -----需要判断x的状态-----
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // x 需要是一个对象或者函数
    try {
      let then = x.then; // get then方法 这个then方法是采用defineProperty来定义的
      /* eslint-disable valid-typeof */
      if (typeof then === 'funtion') {
        // 判断then是不是一个函数，如果then 不是一个函数 说明不是promise x = {then: {}}
        // 只能认准他是一个promise了
        then.call(
          x,
          y => {
            // 如果x是一个promise 就采用这个promise的返回结果
            resolve(y);
          },
          r => {
            reject(r); // 直接用r 作为失败的结果
          }
        );
      } else {
        // 对象
        resolve(x);
      }
    } catch (e) {
      reject(e); // 取then失败了 直接触发promise2的失败逻辑
    }
  } else {
    // 肯定不是promise
    resolve(x); // 直接成功即可
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING; // 默认是等待态
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = []; // 存放成功是的回调
    this.onRejectedCallbacks = []; // 存放失败时的回调

    // 只有状态是等待态的时候，才可以更新状态
    let resolve = value => {
      if (this.status == PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 发布的过程
        this.onResolvedCallbacks.length &&
          this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.status == PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.length &&
          this.onRejectedCallbacks.forEach(fn => fn()); // 发布的过程
      }
    };
    // executor 执行的时候 需要传入两个参数，给用户来改变状态
    try {
      executor(resolve, reject);
    } catch (error) {
      // 表示当前有异常，那就使用这个异常作为promise失败的原因
      reject(error);
    }
  }
  // 只要x是一个普通值，就会让下一个promise变成成功态
  // 如果这个x 有可能是一个promise，我需要采用这个promise的状态
  then(onFulfilled, onRejected) {
    // 递归
    let promise2 = new Promise((resolve, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 订阅的过程
      if (this.status == PENDING) {
        this.onResolvedCallbacks.push(() => {
          // AOP 面向切片编程;
          // TODO ...
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

new Promise(resolve => {
  setTimeout(() => {
    resolve('data');
  }, 1500);
})
  .then(data => {
    console.log('data1', data);
    return data;
  })
  .then(data => {
    console.log('data2', data);
  });

module.exports = Promise;
