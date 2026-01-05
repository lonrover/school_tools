/********************************
 * 菜单高亮
 ********************************/
function setActiveMenu(id){
  document.querySelectorAll('.menu-item').forEach(item=>{
    item.classList.remove('active')
  })
  const el = document.getElementById(id)
  if(el) el.classList.add('active')
}

/********************************
 * 表名定义
 ********************************/
const TABLE = {
  ledger:  'ledger_data',
  assets:  'assets_data',
  usage:   'usage_data',
  consume: 'consume_data',
  cash:    'cash_data'
}

/********************************
 * 本地文本数据库（localStorage）
 ********************************/
const DB = {
  get(key){
    return JSON.parse(localStorage.getItem(key) || '[]')
  },
  set(key, data){
    localStorage.setItem(key, JSON.stringify(data))
  }
}

/********************************
 * Excel 导出（通用）
 * tableKey  : TABLE.xxx
 * headers   : 表头数组
 * filename  : 导出的文件名
 ********************************/
function exportExcel(tableKey, headers, filename){
  if(typeof XLSX === 'undefined'){
    alert('Excel 库未加载，请检查 xlsx CDN')
    return
  }

  const data = DB.get(tableKey)
  const sheetData = [headers, ...data]

  const ws = XLSX.utils.aoa_to_sheet(sheetData)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, filename)
}

/********************************
 * Excel 导入（通用）
 * file        : File 对象
 * tableKey    : TABLE.xxx
 * expectedLen : 每行字段数量
 * callback    : 导入完成后回调（如 render）
 ********************************/
function importExcel(file, tableKey, expectedLen, callback){
  if(!file) return

  if(typeof XLSX === 'undefined'){
    alert('Excel 库未加载，请检查 xlsx CDN')
    return
  }

  const reader = new FileReader()

  reader.onload = e => {
    const wb = XLSX.read(e.target.result, { type: 'binary' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1 })

    // 删除表头
    rows.shift()

    // 清洗数据
    const cleanData = rows
      .filter(r => r.length >= expectedLen)
      .map(r => r.slice(0, expectedLen).map(v => v === undefined ? '' : v))

    DB.set(tableKey, cleanData)

    callback && callback()
  }

  reader.readAsBinaryString(file)
}
