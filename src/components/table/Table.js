import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  isCell,
  matrix,
  shouldResize,
  nextSelector
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
    this.rowsCount = 20;
  }

  toHTML() {
    return createTable(this.rowsCount);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($el) {
    this.selection.select($el);
    this.$emit('table:select', $el)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keysForCellNavigation = [
      'Enter',
      'ArrowDown',
      'ArrowUp',
      'ArrowRight',
      'Tab',
      'ArrowLeft',
    ];
    const { key } = event
    if (keysForCellNavigation.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const currentId = this.selection.current.id(true);
      const newId = nextSelector(key, currentId)

      const $nextCell = this.$root.find(newId);
      if ($nextCell.$el) {
        this.selectCell($nextCell)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
