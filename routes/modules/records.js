const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  const today = new Date()
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories, today }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, date, category, merchant, amount } = req.body
  const userId = req.user._id
  Record.create({ name, date, category, amount, merchant, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ userId, _id })
    .then(record => record.remove())
    .then(() => res.redirect(req.get('referer')))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = []
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.log(error))

  Record.findOne({ userId, _id })
    .lean()
    .then(record => {
      const restCategories = categories.filter((category) => category.name !== record.category)
      res.render('edit', { record, restCategories })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { name, date, category, amount, merchant } = req.body
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ userId, _id })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.merchant = merchant
      return record.save()
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
