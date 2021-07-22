const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
require('handlebars-helpers')()
require('./config/mongoose')

const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
