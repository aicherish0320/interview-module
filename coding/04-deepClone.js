// ! 深克隆

const obj = {
  a: 1,
  b: '1',
  c: true,
  d: null,
  e: undefined,
  f: function () {
    console.log(f)
  },
  g: [1, 2],
  h: {
    foo: 'foo'
  },
  i: new Date(),
  j: /\W+/gi
}

function isObject(val) {
  return typeof val === 'object'
}

function getType(val) {
  return Object.prototype.toString
    .call(val)
    .match(/\[object (.+)\]/)[1]
    .toLowerCase()
}

function deepClone(source) {
  if (isObject(source)) {
    const type = getType(source)

    switch (type) {
      case 'date':
        return new Date(source)
      case 'regexp':
        return new RegExp(source.source, source.flags)
      case 'function':
        return function () {
          return source.call(this, ...arguments)
        }
      default:
        const cloneVal = Array.isArray(source) ? [] : {}
        for (const key in source) {
          cloneVal[key] = deepClone(source[key])
        }
        return cloneVal
    }
  } else {
    return source
  }
}

const newObj = deepClone(obj)

console.log(newObj)
