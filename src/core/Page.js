export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {}

  afterRender() {}

  destroy() {}
}
