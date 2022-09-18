class Emitter {
  constructor() {
    this.handler = {}
  }

  on(eventName, callback) {
    if (!this.handler[eventName]) {
      this.handler[eventName] = []
    }
    this.handler[eventName].push(callback)
  }
  emit(eventName) {
    if (this.handler[eventName]) {
      this.handler[eventName].forEach((cb) => cb())
    }
  }
  off(eventName, callback) {
    if (this.handler[eventName]) {
      this.handler[eventName] = this.handler[eventName].filter(
        (cb) => cb !== callback
      )
    }
  }
}

const emit = new Emitter()
const handle1 = () => {
  console.log(1)
}
const handle2 = () => {
  console.log(2)
}

emit.on('foo', handle1)
emit.on('foo', handle2)

emit.off('foo', handle1)

emit.emit('foo')
