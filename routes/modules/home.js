const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
let totalAmount = 0

router.get('/', (req, res) => {
  const userId = req.user._id
  const categories = []
  const records = []
  totalAmount = 0

  Category.find()
    .lean()
    .then(category => {
      categories.push(...category)
      Record.find({ userId })
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
    .catch(error => console.log(error))
})

router.get('/filter', (req, res) => {
  const categoryFilter = req.query.category
  const userId = req.user._id
  const categories = []
  const records = []
  totalAmount = 0

  Category.find()
    .lean()
    .then(category => {
      categories.push(...category)
      Record.find({ userId, category: categoryFilter })
        .lean()
        .then(record => {
          records.push(...record)
          records.forEach(record => {
            const category = categories.find(category => category.name === record.category)
            record.icon = category.icon
            totalAmount += record.amount
          })
          res.render('index', { records, categories, totalAmount, categoryFilter })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
