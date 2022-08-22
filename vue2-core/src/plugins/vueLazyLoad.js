import { throttle } from 'lodash-es'

const VueLazyLoad = {
  install(Vue, options) {
    const LazyClass = lazy(Vue)
    const lazyInstance = new LazyClass(options)
    Vue.directive('lazy', {
      bind: lazyInstance.add.bind(lazyInstance),
      unbind: lazyInstance.remove.bind(lazyInstance)
    })
  }
}

const scrollParent = (parent) => {
  while (parent) {
    if (/scroll/.test(getComputedStyle(parent)['overflow'])) {
      return parent
    }
    parent = parent.parentNode
  }
}

function render(listener, status) {
  let src = ''
  switch (status) {
    case 'loading':
      src = listener.options.loading
      break
    case 'loaded':
      src = listener.src
      break
    case 'error':
      src = listener.options.error
      break
    default:
      break
  }
  console.log('src >>> ', src)
  listener.el.setAttribute('src', src)
}
function loadImage(src, resolve, reject) {
  const img = new Image()
  img.src = src
  img.onload = resolve
  img.onerror = reject
}

const lazy = (Vue) => {
  class ReactiveListener {
    constructor({ el, src, options }) {
      this.el = el
      this.src = src
      this.options = options
      this.state = {
        loading: false
      }
    }
    checkInView() {
      const { top } = this.el.getBoundingClientRect()
      return top < window.innerHeight * this.options.preLoad
    }
    load() {
      render(this, 'loading')
      loadImage(
        this.src,
        () => {
          this.state.loading = true
          render(this, 'loaded')
        },
        () => {
          this.state.loading = true
          render(this, 'error')
        }
      )
    }
  }

  return class LazyClass {
    constructor(options) {
      this.options = options
      this.bindHandler = false
      this.listeners = []
    }
    add(el, binding) {
      const listener = new ReactiveListener({
        el,
        src: binding.value,
        options: this.options
      })
      this.listeners.push(listener)
      // 监控 el 是否需要显示
      // 绑定滚动事件
      Vue.nextTick(() => {
        const ele = scrollParent(el)
        if (!this.bindHandler) {
          ele.addEventListener(
            'scroll',
            throttle(this.lazyLoadHandler.bind(this), 200),
            {
              passive: true
            }
          )
          this.bindHandler = true
        }
        // 初始化
        this.lazyLoadHandler()
      })
    }
    lazyLoadHandler() {
      this.listeners.forEach((listener) => {
        if (listener.state.loading) return
        listener.checkInView() && listener.load()
      })
    }
    remove() {}
  }
}

export default VueLazyLoad
