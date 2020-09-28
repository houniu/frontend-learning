/* eslint-disable no-unused-vars */
class KVue {
  constructor(options) {
    this.$options = options;

    // 数据响应变化
    this.$data = options.data;
    this.observe(this.$data);

    // 模拟一下watcher的创建
    // new Watcher();
    // this.$data.test;
    // new Watcher();
    // this.$data.foo.bar;

    /* eslint-disable no-undef */
    // *编译阶段添加依赖收集
    new Compile(options.el, this);

    // created hook 执行;
    options.created &&
      typeof options.created === 'function' &&
      options.created.call(this);
  }

  observe(data) {
    if (!data || typeof data !== 'object') {
      throw new TypeError('data option must Object');
    }

    // 遍历该对象
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);

      // 代理data中的属性到vue实例上
      this.proxyData(key);
    });
  }

  // 数据响应化
  defineReactive(obj, key, val) {
    if (typeof val === 'object') {
      this.observe(val); // 递归解决数据嵌套
    }

    const dep = new Dep();

    // vue利用了es5：defineProperty数据劫持
    Object.defineProperty(obj, key, {
      // 在属性的get阶段会添加依赖的收集（watcher）
      get() {
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
        // console.log(`${key}属性更新了：${val}`)

        // 函数的作用域【闭包】$data选项中的每一个属性都包含一个全新实例化的dep(依赖) watcher(监听器可能多个)
        dep.notify();
      },
    });
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      },
    });
  }
}

// Dep: 用来管理Watcher
class Dep {
  constructor() {
    // 这里存放若干依赖（watcher）
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }
  // 通知watcher去更新
  notify() {
    this.deps.forEach(dep => dep.update());
  }
}

// Watcher
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // 将当前watcher实例指定到Dep静态属性target上
    Dep.target = this;

    // 在这添加依赖getter
    this.vm[this.key]; // 触发getter, 添加依赖
    Dep.target = null; // 添加完之后置为null
  }

  update() {
    // console.log('属性更新了');

    this.cb &&
      typeof this.cb === 'function' &&
      this.cb.call(this.vm, this.vm[this.key]);
  }
}
