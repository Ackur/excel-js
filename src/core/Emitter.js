export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...arg) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...arg)
    })
    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// Emmiter Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('Ackur', data => console.log(data))

// emitter.emit('Ackur', 34)

// setTimeout(() => {
//   emitter.emit('Ackur', 'Thirty four')
// }, 2000)

// setTimeout(() => {
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('Ackur', 'Thirty five')
// }, 4000)
