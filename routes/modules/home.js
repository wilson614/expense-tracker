const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
let totalAmount = 0

router.get('/', (req, res) => {
  const categories = []
  const records = []
  totalAmount = 0

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

router.get('/filter', (req, res) => {
  const category = req.query.category
  const categories = []
  const records = []

  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.log(error))

  Record.find({ category })
    .lean()
    .then(record => {
      records.push(...record)
      records.forEach(record => {
        const category = categories.find(category => category.name === record.category)
        record.icon = category.icon
      })
      res.render('index', { records, categories, totalAmount, category })
    })
    .catch(error => console.log(error))
})

module.exports = router
