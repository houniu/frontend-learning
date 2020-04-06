// 什么是promise 解决那些问题的（基于回调）
// 1. 回调地狱（代码不好维护,错误处理非常麻烦不能统一处理错误）
// 2. 多个请求并发的问题

// $.ajax({
//   success: () => {
//     $.ajax({
//       success: () => {

//       },
//       fail() {},
//     })
//   },
//   fail: () => {

//   }
// })

// new Promise((resolve, reject) => {
//     console.log(1)
// })
// console.log(2)

// Promise 是一个类 类只需要用的时候new一下,new Promise是需要传递一个执行器函数，这个executor默认就会被立即执行
// 每个promise 都有三个状态 pending 等待 fulfilled 成功态 rejected 失败态
// 默认创建一个promise 是等待态 在执行器默认提供给你两个函数 resolve让promise变成成功态度，reject让promise变成失败态
// 每个promise的实例都具备一个then方法 then方法传递两个参数1.成功的回调 2.失败的回调
// 如何让promise变成失败态 reject() || 可以抛出一个错误
// 如果多次调用成功或者失败 只会执行一次, 并且一旦状态变化了 就不能再变成成功或者失败了

// 1.自己实现基本的promise
// 2.语法 commonjs 规范 我们可以在一个模块中倒出一个变量，另一个模块来引用
const Promise = require('./promise');

/* eslint-disable no-unused-vars */
let promise = new Promise((resolve, reject) => {
  // resolve('success');
  // throw new Error('error');
  // reject('fail');

  setTimeout(() => {
    // 宏任务异步的
    resolve('success'); // 此时如果调用了resolve 就让刚才存储的成功的回调函数去执行
  }, 1000);
});
// 同一个promise实例 可以then多次
// 核心就是【发布订阅模式】
promise.then(
  success => {
    // 如果调用then的时候没有成功也没有失败，可以先保存成功和失败的回调
    /* eslint-disable no-console */
    console.log('success', success);
  },
  err => {
    console.log('fail', err);
  }
);
promise.then(
  success => {
    console.log('success', success);
  },
  err => {
    console.log('fail', err);
  }
);
