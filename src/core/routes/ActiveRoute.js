export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1).split('/')[0];
  }

  static get param() {
    const param = window.location.hash.split('/')
    return param.length > 1 ? param[1] : null
  }

  static navigate(path) {
    window.location.hash = path
  }
}
