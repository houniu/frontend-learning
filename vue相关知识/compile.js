// 用法: new Compile(el, vm);
/* eslint-disable no-unused-vars */
class Compile {
  constructor(el, vm) {
    // 要遍历的宿主节点;
    this.$el = document.querySelector(el);

    this.$vm = vm;

    // 编译
    if (this.$el) {
      // 先转换内部内容为片段Fragment;
      this.$fragment = this.node2Fragment(this.$el);
      // 执行编译
      this.compile(this.$fragment);
      // 将编译完的html结果追加至$el;
      this.$el.appendChild(this.$fragment);
    }
  }

  // 将宿主元素中代码片段拿出来遍历，这样做比较高效
  node2Fragment(el) {
    const frag = document.createDocumentFragment();
    // 将el中所有子元素搬家至frag中;
    let child;
    /* eslint-disable no-cond-assign */
    while ((child = el.firstChild)) {
      frag.appendChild(child);
      child = null;
    }

    // 主要是操作frag
    return frag;
  }

  // 编译过程
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 拿出每一个节点做类型判断;
      if (this.isElement(node)) {
        // dom元素
        // console.log(`编译元素: ${node.nodeName}`);

        // 查找k-, @, :
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
          const attrName = attr.name; // 属性名
          const exp = attr.value; // 属性值
          if (this.isDirective(attrName)) {
            // k-text
            const dir = attrName.substring(
              attrName.indexOf('k-') + 'k-'.length
            );
            // 执行指令
            this[dir] &&
              typeof this[dir] === 'function' &&
              this[dir](node, this.$vm, exp); // exp表达式对应的就是data选项中的key
          } else if (this.isEvent(attrName)) {
            const dir = attrName.substring(attrName.indexOf('@') + '@'.length); // @click
            this.eventHandler(node, this.$vm, exp, dir);
          }
        });
      } else if (this.isInterpolation(node)) {
        // 文本节点
        // console.log(`编译文本: ${node.textContent}`);
        this.compileText(node);
      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  compileText(node) {
    // console.log(RegExp.$1);
    // node.textContent = this.$vm.$data[RegExp.$1];

    // RegExp.$1 为data选项中的属性
    this.update(node, this.$vm, RegExp.$1, 'text');
  }

  // 更新函数
  update(node, vm, exp, dir) {
    const updaterFn = this[dir + 'Updater'];

    // 初始化
    updaterFn && updaterFn(node, vm[exp]);

    /* eslint-disable no-undef */
    // 依赖收集
    new Watcher(vm, exp, function(value) {
      updaterFn && updaterFn(node, value);
    });
  }

  // k-text指令处理逻辑
  text(node, vm, exp) {
    this.update(node, vm, exp, 'text');
  }

  // k-model双向数据绑定处理
  model(node, vm, exp) {
    // 指定input的value属性
    this.update(node, vm, exp, 'model');

    // 视图对数据模型响应
    node.addEventListener('input', evt => {
      vm[exp] = evt.target.value;
    });
  }

  modelUpdater(node, val) {
    node.value = val;
  }

  // k-html指令处理
  html(node, vm, exp) {
    this.update(node, vm, exp, 'html');
  }

  htmlUpdater(node, value) {
    node.innerHTML = value;
  }

  textUpdater(node, value) {
    node.textContent = value;
  }

  // 事件处理器
  eventHandler(node, vm, exp, dir) {
    // @click="onClick"
    let fn = vm.$options.methods && vm.$options.methods[exp];
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm), false);
    }
  }

  isDirective(attr) {
    return attr.indexOf('k-') === 0;
  }

  isEvent(attr) {
    return attr.indexOf('@') === 0;
  }

  isElement(node) {
    return node.nodeType && node.nodeType === 1;
  }

  // 插值文本
  isInterpolation(node) {
    return (
      node.nodeType &&
      node.nodeType === 3 &&
      /\{\{(.*)\}\}/.test(node.textContent)
    );
  }
}
