function debounce(fn, delay = 500) {
  let timer
  return function (...args) {
    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}

function throttle(fn, delay = 500) {
  let timer
  return function (...args) {
    if (timer) return

    timer = setTimeout(() => {
      fn.call(this, ...args)
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}
