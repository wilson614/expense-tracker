const db = require('../../config/mongoose')
const Category = require('../category')

const categories = [
  {
    name: '家居物業',
    icon: '<i class="fas fa-home"></i>'
  },
  {
    name: '交通出行',
    icon: '<i class="fas fa-shuttle-van"></i>'
  },
  {
    name: '休閒娛樂',
    icon: '<i class="fas fa-grin-beam"></i>'
  },
  {
    name: '餐飲食品',
    icon: '<i class="fas fa-utensils"></i>'
  },
  {
    name: '其他',
    icon: '<i class="fas fa-pen"></i>'
  }
]

db.once('open', () => {
  Category.create(categories)
    .then(() => {
      console.log('categorySeeder done!')
      db.close()
    }).then(() => {
      console.log('database connection closed!')
    })
})
