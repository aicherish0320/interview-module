class Person {
  constructor(fullName) {
    this.fullName = fullName
  }
}

const p1 = new Person('p1')

console.log(p1 instanceof Person)
console.log(p1 instanceof Function)
console.log(p1 instanceof Object)

function _instanceof(inst, ctor) {
  let proto = inst.__proto__
  while (proto) {
    if (proto === ctor.prototype) {
      return true
    }

    proto = proto.__proto__
  }
  return false
}

console.log(_instanceof(p1, Person))
console.log(_instanceof(p1, Function))
console.log(_instanceof(p1, Object))
