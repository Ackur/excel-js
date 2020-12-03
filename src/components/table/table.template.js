const CODES = {
  A: 65,
  Z: 90,
}

function createCell() {
  const data = `
    <div class="cell" contenteditable>
    </div>
  `
  return data
}

function createCol(content) {
  return `
    <div class="column">
      ${content}
    </div>
  `
}

function createRow(content, index) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
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