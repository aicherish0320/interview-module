const source = {
  a: 1,
  b: '1',
  c: new Date(),
  d: /[a-z]/g
}

const getType = (val) =>
  Object.prototype.toString
    .call(val)
    .match(/\[object (.*)\]/)[1]
    .toLowerCase()

function depClone(source) {
  if (typeof source === 'object') {
    const type = getType(source)

    switch (type) {
      case 'date':
        return new Date(source)
      case 'regexp':
        return new RegExp(source.source, source.flags)
      default:
        const cloneVal = Array.isArray(source) ? [] :{}
        for (const key in source) {
          cloneVal[key] = depClone(source[key])
        }
        
        return cloneVal
    }
  } else {
    return source
  }
}
