import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template'
import { resizeTableHandling } from './resize.table.js'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeTableHandling(event, this.$root)
    }
  }
}
