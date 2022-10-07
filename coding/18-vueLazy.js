//  Vue.use(LazyLoad, {
//   loading: '',
//   preLoad: 1,
//  })

function getScrollParent(el) {
  let parent = el.parent
  while (parent) {
    if (/(scroll)|(auto)/.test(getComputedStyle(parent)['overflow'])) {
      return parent
    }
    parent = parent.parentNode
  }
  return null
}

function render(imgListener, state) {
  const el = imgListener.el
  switch (state) {
    case 'loading':
      el.src = imgListener.options.loading
      break
    case 'loaded':
      el.src = imgListener.loading
      break
    default:
      break
  }
}
function loadImg() {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = src
    img.onload = resolve
    img.onerror = reject
  })
}

class ReactiveListener {
  constructor(el, src, options) {
    this.el = el
    this.src = src
    this.options = options

    this.state = {
      loading: false
    }
  }
  checkInView() {
    const { top } = this.el.getBoundingRect()
    return top < window.innerHeight * this.options.preLoad
  }
  load() {
    render(this, 'loading')

    loadImg(this.src)
      .then(() => {
        this.state.loading = true
        render(this, 'loaded')
      })
      .catch(() => {
        this.state.loading = true
      })
  }
}

class LazyClass {
  constructor(options) {
    this.options = options
    this.Vue = Vue
    this.handleScrollHandler = false
    this.queue = []
  }
  add(el, binding) {
    const { Vue } = this

    Vue.nextTick(() => {
      const imgListener = new ReactiveListener(el, binding.value, this.options)
      this.queue.push(imgListener)

      // 添加滚动
      if (!this.handleScrollHandler) {
        const ele = getScrollParent(el)
        if (ele) {
          ele.addEventListener('scroll', this.lazyLoadHandler.bing(this))
        }

        this.handleScrollHandler = true
      }
    })
  }
  unbind(el, binding) {}
  lazyLoadHandler() {
    this.queue.forEach((imgListener) => {
      if (imgListener.state.loading) return
      imgListener.checkInView && checkInView.load()
    })
  }
}

export default {
  install(Vue, options) {
    const lazy = new LazyClass(options, Vue)

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy),
      unbind: lazy.unbind.bind(lazy)
    })
  }
}
