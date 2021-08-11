const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '兩次輸入的密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('此信箱已註冊！')
        return res.render('register', { name, email, password, confirmPassword })
      }
      User.create({ name, email, password })
        .then(user => {
          req.login(user, (error) => {
            if (error) { return console.log(error) }
            req.flash('success_msg', '註冊成功！')
            res.redirect('/')
          })
        })
        .catch(error => console.log(error))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出！')
  res.redirect('/users/login')
})

module.exports = router
