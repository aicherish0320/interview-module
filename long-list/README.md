# long-list

# 长列表渲染优化

## 什么是进程？什么是线程？

- 进程是系统进行资源分配和调度的一个独立单位，一个进程内包含多个线程

## 渲染进程

- `GUI` 渲染线程（页面渲染）
- `JS` 引擎线程（执行 `JS` 脚本的）
- 事件触发线程（EventLoop 轮询处理线程）
- 事件、定时器、ajax（xhr），独立线程

> GUI 渲染线程 和 JS 引擎线程互斥的

### JS 为什么是单线程的？

一个线程在某个 `DOM` 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准呢？

## 浏览器中的 EventLoop

## 超长列表渲染性能优化

- 分片渲染（通过浏览器事件环机制，分割渲染时间）
  - 问题：分片加载，会导致页面 dom 元素过多，造成页面的卡顿
- 虚拟列表（只渲染可视区域）

### TODO

- WebWorker
- RequestAnimationFrame
