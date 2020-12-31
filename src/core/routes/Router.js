import { Loader } from '../../components/Loader.js';
import {$} from '../dom.js';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null
    this.loader = Loader

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    const path = ActiveRoute.path
    let Page = ''
    Object.keys(this.routes).forEach(val => {
      if (val === path) {
        Page = this.routes[path]
      }
    })

    this.$placeholder.clear().append(this.loader())

    if (Page) {
      this.page = new Page(ActiveRoute.param)
      const root = await this.page.getRoot()
      this.$placeholder.clear().append(root)
      this.page.afterRender()
    } else {
      this.$placeholder.clear().append(`404 - Ooops`)
    }
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
