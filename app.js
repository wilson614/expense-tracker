const express = require('express')
const exphbs = require('express-handlebars')
require('handlebars-helpers')()
require('./config/mongoose')

const routes = require('./routes')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
