import { storage } from '@core/utils'

function toHtml(key) {
  const record = storage(key)
  const param = key.split(':')[1]
  const lastUpdade = new Date(record.lastUpdate).toLocaleString()
  return `
        <li class="db__record">
            <a href="#excel/${param}">${ record.title }</a>
            <strong>${lastUpdade}</strong>
        </li>
    `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p class="text-center"> Вы пока не создали ни одной таблицы </p>`;
  }

  return `
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>
      <ul class="db__list">
        ${keys.map(toHtml).join('')}
      </ul>
  `;
}
