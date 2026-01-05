// （公共 JS：数据库 + 工具）
const DB = {
  get(key) {
    return JSON.parse(localStorage.getItem(key) || '[]')
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

const TABLE = {
  ledger: 'lab_ledger',
  assets: 'lab_assets',
  usage: 'lab_usage',
  consume: 'lab_consume',
  cash: 'lab_cash'
}

function qs(id) { return document.getElementById(id) }

function delConfirm(fn) {
  if (confirm('确定删除？')) fn()
}

