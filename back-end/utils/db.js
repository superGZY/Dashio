const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dashio', { useUnifiedTopology: true, useNewUrlParser: true })

const Users = mongoose.model('user', {
  username: String,
  password: String
})

const Positions = mongoose.model('films', {
  id:String,
  img:String,
  nm:String,
  preShow:String,
  rt:String,
  sc:String,
  showInfo:String,
  star:String,
  wish:String,
  createTime:String
})

module.exports = {
  Users,
  Positions
}