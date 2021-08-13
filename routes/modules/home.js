const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const monthListGenerator = require('../../tools/monthListGenerator')
let totalAmount = 0

router.get('/', (req, res) => {
  const userId = req.user._id
  const categories = []
  const records = []
  totalAmount = 0

  const months = monthListGenerator()

  Category.find()
    .lean()
    .then(category => {
      categories.push(...category)
      const categoryList = categories
      Record.find({ userId })
        .lean()
        .then(record => {
          records.push(...record)
          records.forEach(record => {
            const category = categories.find(category => category.name === record.category)
            record.icon = category.icon
            totalAmount += record.amount
          })
          res.render('index', { records, categories, totalAmount, months, categoryList })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/filter', (req, res) => {
  const categoryFilter = req.query.category
  const monthFilter = req.query.month
  const userId = req.user._id
  const categories = []
  let records = []
  totalAmount = 0

  const monthList = monthListGenerator()
  const months = monthList.filter(month => month !== monthFilter)

  Category.find()
    .lean()
    .then(category => {
      categories.push(...category)
      const categoryList = categories.filter(category => category.name !== categoryFilter)
      Record.find({ userId })
        .lean()
        .then(record => {
          records.push(...record)
          if (monthFilter) {
            records = records.filter(record => record.date.toISOString().substring(0, 7) === monthFilter)
          }
          if (categoryFilter) {
            records = records.filter(record => record.category === categoryFilter)
          }
          records.forEach(record => {
            const category = categories.find(category => category.name === record.category)
            record.icon = category.icon
            totalAmount += record.amount
          })
          res.render('index', { records, categories, totalAmount, categoryFilter, months, monthFilter, categoryList })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
