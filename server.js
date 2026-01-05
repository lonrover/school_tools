const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const DB_FILE = path.join(__dirname, 'data/db.json')

app.use(express.json())
app.use(express.static('public'))

/* 读取数据库 */
function readDB(){
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
}

/* 写入数据库 */
function writeDB(data){
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

/* 获取某个表 */
app.get('/api/:table', (req, res)=>{
  const db = readDB()
  res.json(db[req.params.table] || [])
})

/* 保存某个表 */
app.post('/api/:table', (req, res)=>{
  const db = readDB()
  db[req.params.table] = req.body
  writeDB(db)
  res.json({ success: true })
})

app.listen(3000, ()=>{
  console.log('✅ 服务已启动：http://localhost:3000')
})
