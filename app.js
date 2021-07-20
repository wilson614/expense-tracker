const express = require('express')

const app = express()
const port = 3000

require('./config/mongoose')

app.get('/', (req, res) => {
  res.send('Good!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
