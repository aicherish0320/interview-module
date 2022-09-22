const obj = {
  foo: 'foo'
}

function fn() {
  console.log(this.foo)
}

// fn()

// const newFn = fn.bind(obj)
// newFn()

function myBind(fn, context) {
  return function (...args) {
    fn.call(context, ...args)
  }
}

const newFn = myBind(fn, obj)
newFn()
