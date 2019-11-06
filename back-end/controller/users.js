const usersModel = require('../models/users')
const tools = require('../utils/tools')
const isSignmiddleWare = require('../middlewares/isSign')
const signup = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')

  let { username, password } = req.body

  let hash = await tools.hash(password)

  let result = await usersModel.save({
    username,
    password: hash
  })
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '用户注册成功.'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户注册失败.'
      })
    })
  }
}
const signupfilter = async function(req, res, next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { username } = req.body
  console.log(username)
  let result = await usersModel.findOne({username})
  if (!result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '可以注册.'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名已存在.'
      })
    })
  }
}
const hasUsername = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { username } = req.body
  let result = await usersModel.findOne({username})
  if (result) {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名已经存在.'
      })
    })
  } else {
    next()
  }
}

const signin = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { username1:username, password1:password } = req.body

  let result = await usersModel.findOne({username})
  if (result) {
    let compareResult = await tools.compare(password, result.password)
    if (compareResult) {
      //发token
      let token = await tools.generateToken(username)
      //将token埋在heaader里传给前端
      res.header('X-Access-Token', token)
      res.render('succ', {
        data: JSON.stringify({
          type: 'signin',
          username,
          message: '用户登录成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户名或密码不正确.'
        })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名或密码不正确.'
      })
    })
  }
}
const signout = function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  req.session = null
  res.render('succ', {
    data: JSON.stringify({
      message: '注销成功.'
    })
  })
}
const isSignin = isSignmiddleWare
module.exports = {
  signup,
  hasUsername,
  signin,
  signupfilter,
  isSignin,
  signout
}