const pending = Symbol('pending')
const fulFilled = Symbol('fulFilled')
const rejected = Symbol('rejected')

class Promise {
  constructor(executor) {
    this._initBind()
    this._initValue()
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  _initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  _initValue() {
    this.value = null
    this.status = pending
  }
  resolve(value) {
    if (this.status !== pending) return
    this.status = fulFilled
    this.value = value
  }
  reject(reason) {
    if (this.status !== pending) return
    this.status = rejected
    this.value = reason
  }
  then(onFulFilled, onRejected) {
    if (this.status === fulFilled) {
      onFulFilled(this.value)
    } else if (this.status === rejected) {
      onRejected(this.value)
    } else {
      // TODO
    }
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      const ret = []
      let times = 0

      function processSuccess(index, value) {
        if (++times === promises.length) {
          resolve(ret)
        }
        ret[index] = value
      }

      promises.forEach((promise, index) => {
        if (typeof promise.then === 'function') {
          promise.then(
            (data) => {
              processSuccess(index, data)
            },
            error =>{
              reject(error)
              // processSuccess(index, data)
            }
          )
        } else {
          processSuccess(index, promise)
        }
      })
    })
  }
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      const ret = []
      let times = 0

      function processSuccess(index, value) {
        if (++times === promises.length) {
          resolve(ret)
        }
        ret[index] = value
      }

      promises.forEach((promise, index) => {
        if (typeof promise.then === 'function') {
          promise.then(
            (data) => {
              // processSuccess(index, data)
              processSuccess(index, { status: 'fulfilled', value: data })
            },
            (error) => {
              // reject(error)
              // processSuccess(index, data)
              processSuccess(index, { status: 'rejected', value: error })
            }
          )
        } else {
          processSuccess(index, { status: 'fulfilled', value: promise })
        }
      })
    })
  }
}

const p1 = new Promise((resolve, reject) => {
  reject(1)
})
const p2 = new Promise((resolve, reject) => {
  resolve(2)
})
const p3 = new Promise((resolve, reject) => {
  resolve(3)
})

Promise.allSettled([12, p1, p2, p3]).then(
  (data) => {
    console.log('data >>> ', data)
  },
  (error) => {
    console.log('error >>> ', error)
  }
)
