class Scope {
  constructor(options = {}) {
    this.name = options.name
    this.parent = options.parent
    // 存放着当前作用域内的所有变量
    this.names = options.params || []
  }
  add(name) {
    this.names.push(name)
  }
  // 给我一个变量 查一个在哪个作用域中定义的变量
  findDefiningScope(name) {
    if(this.names.includes(name)) {
      return this
    }
    if(this.parent) {
      return this.parent.findDefiningScope(name)
    }

    return null
  }
}

module.exports = Scope
