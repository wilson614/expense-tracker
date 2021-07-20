const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const categories = []
  const records = []
  let totalAmount = 0

  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.log(error))

  Record.find()
    .lean()
    .then(record => {
      records.push(...record)
      records.forEach(record => {
        const category = categories.find(category => category.name === record.category)
        record.icon = category.icon
        totalAmount += record.amount
      })
      res.render('index', { records, categories, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router
