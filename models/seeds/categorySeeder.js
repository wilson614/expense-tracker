if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')

const categories = [
  {
    name: '家居物業',
    icon: '<i class="fas fa-home fa-3x"></i>'
  },
  {
    name: '交通出行',
    icon: '<i class="fas fa-shuttle-van fa-3x"></i>'
  },
  {
    name: '休閒娛樂',
    icon: '<i class="fas fa-grin-beam fa-3x"></i>'
  },
  {
    name: '餐飲食品',
    icon: '<i class="fas fa-utensils fa-3x"></i>'
  },
  {
    name: '其他',
    icon: '<i class="fas fa-pen fa-3x"></i>'
  }
]

db.once('open', () => {
  Category.findOne({ name: categories[0].name })
    .then(category => {
      if (category) {
        console.log('已經建立過類別種子資料囉！')
        db.close()
      } else {
        Category.create(categories)
          .then(() => {
            console.log('categorySeeder done!')
            db.close()
          }).then(() => {
            console.log('database connection closed!')
          })
      }
    })
})
