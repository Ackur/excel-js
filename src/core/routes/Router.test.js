import { Page } from '../Page';
import { ActiveRoute } from './ActiveRoute.js'
import { Router } from './Router';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}

class ExcelPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'excel';
    return root;
  }
}

describe('Router', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      '': DashboardPage,
      'excel': ExcelPage
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', () => {
    ActiveRoute.navigate('excel')
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>excel</div>')
  })
})
