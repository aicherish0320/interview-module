const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('rejected')

class AcPromise {
  constructor(callback) {
    this.initBind()
    this.promiseStatus = pending
    this.promiseValue = null

    try {
      callback(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)

    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []
  }
  resolve() {
    this._changePromiseStatus(fulfilled, value)
    this._triggerExecuteCollection(this.fulfilledCallbacks)
  }
  reject() {
    this._changePromiseStatus(rejected, value)
    this._triggerExecuteCollection(this.rejectedCallbacks)
  }
  _changePromiseStatus(statusType, value) {
    if (this.promiseStatus !== pending) return
    this.promiseStatus = statusType
    this.promiseValue = value
  }
  _triggerExecuteCollection(array) {
    while (array.length > 0) {
      array.shift()(this.promiseValue)
    }
  }
  then(onFullFilled, onRejected) {
    onFullFilled = typeof onFullFilled === 'function' ? onFullFilled : () => {}
    onRejected = typeof onRejected === 'function' ? onRejected : () => {}

    if (this.promiseStatus === pending) {
      this.fulfilledCallbacks.push(onFullFilled.bind(this))
      this.rejectedCallbacks.push(onRejected.bind(this))
      return
    }

    if (this.promiseStatus === fulfilled) {
      setTimeout(() => {
        onFullFilled(this.promiseValue)
      })
      return
    }

    if (this.promiseStatus === rejected) {
      setTimeout(() => {
        onRejected(this.promiseValue)
      })
      return
    }
  }
}

const p = new Promise((resolve, reject) => {})

p.then(
  (res) => {},
  (reason) => {}
)
