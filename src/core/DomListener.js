import {capitalize} from '@core/utils.js'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented 
            in ${this.constructor.name} Component`
        )
      }

      this[method] = this[method].bind(this)
      this.$root.addEventListener(listener, this[method])
    })
  }

  removeDOMListeners() {
    console.log('removeDOMListeners');
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented 
            in ${this.name} Component`
        )
      }
      this.$root.removeEventListener(listener, this[method])
      console.log(this.$root);
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
