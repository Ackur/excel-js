import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)

      const component = new Component($el)
      // // DEBUG
      // if (component.constructor.name) {
      //   console.log(component.constructor.name);
      //   window['c'+component.constructor.name] = component
      // }
      // // --END-- DEBUG
      $($el).html(component.toHTML())
      $root.append($el)

      return component
    })

    console.log(this.components);

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
