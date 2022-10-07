function Parent(name) {
  this.name = name
}

Parent.prototype.say = function () {
  console.log('Hello')
}

function Children() {
  Parent.call(this)
}

Children.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child
  }
})
