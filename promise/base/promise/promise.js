/* eslint-disable no-console */
console.log('my Promise');
const PENDING = 'PENDING'; // 等待态
const FULFILLED = 'FULFILLED'; // 成功态
const REJECTED = 'REJECTED'; // 失败态

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

  then(onFulfilled, onRejected) {
    if (this.status == FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status == REJECTED) {
      onRejected(this.reason);
    }
    // 订阅的过程
    if (this.status == PENDING) {
      this.onResolvedCallbacks.push(() => {
        // AOP 面向切片编程;
        // TODO ...
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = Promise;
