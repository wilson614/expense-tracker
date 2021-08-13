const bcrypt = require('bcrypt')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')

const defaultUsers = [
  {
    name: 'user',
    email: 'user@example.com',
    password: '12345678'
  }
]

const records = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021/04/23',
    amount: 60,
    merchant: '7-11'
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2021/06/23',
    amount: 60,
    merchant: '全家'
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2021/04/23',
    amount: 120
  },
  {
    name: '電影：驚奇隊長',
    category: '休閒娛樂',
    date: '2021/04/23',
    amount: 220,
    merchant: '國賓影城'
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2021/06/20',
    amount: 25000
  }
]

db.once('open', () => {
  Promise.all(Array.from(defaultUsers, (defaultUser) => {
    const { name, email, password } = defaultUser
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({ name, email, password: hash }))
      .then(user => {
        return Promise.all(Array.from(records, (record) => {
          const { name, category, date, amount, merchant } = record
          const userId = user._id
          return Record.create({ name, category, date, amount, merchant, userId })
        }))
      })
  }))
    .then(() => {
      console.log('recordSeeder done!')
      process.exit()
    })
})
