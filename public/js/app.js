const API = {
  async get(table){
    const res = await fetch(`/api/${table}`)
    return await res.json()
  },
  async set(table, data){
    await fetch(`/api/${table}`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
  }
}
