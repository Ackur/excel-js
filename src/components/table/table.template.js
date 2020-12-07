const CODES = {
  A: 65,
  Z: 90,
}

function createCell(_, col) {
  const data = `
    <div class="cell" contenteditable data-col="${col}">
    </div>
  `
  return data
}

function createCol(content, index) {
  return `
    <div class="column" data-type="resizeble" data-col="${index}">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index) {
  const resizer = index? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizeble">
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


export function createTable(rowCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')

    rows.push(createRow(cells, i+1))
  }

  return rows.join('');
}
