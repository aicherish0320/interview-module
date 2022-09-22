const obj = {
  foo: 'foo'
}

function fn(args) {
  console.log(this.foo, args)
}

// fn.call(obj, '参数')
// fn.apply(obj, ['参数'])

function _call(context, fn, ...args) {
  const obj = Object.create({ ...context, fn })
  obj.fn(...args)
}

_call(obj, fn, '参数')

function _apply(context, fn, args) {
  const obj = Object.create({ ...context, fn })
  obj.fn(...args)
}

_apply(obj, fn, ['参数'])
