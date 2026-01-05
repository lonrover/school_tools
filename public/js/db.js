/********************
 * localStorage 文本数据库
 ********************/
const DB = {
  get(key){
    return JSON.parse(localStorage.getItem(key) || '[]')
  },
  set(key,data){
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
