const fs = require('fs')
const path = require('path')

const positionModel = require('../models/positions')
const moment = require('moment')

const findAll =async (req, res, next) => {  
    res.set('Content-Type', 'application/json; charset=utf-8')
    let pageInfo = req.query
    console.log(pageInfo)
    let result = await positionModel.findAll(pageInfo)
    if(result){
      res.render('succ', {
        data: JSON.stringify(result)
      })
    }
    else{
      res.render('fail',{
        data:JSON.stringify({})
      })
    }
}
const save = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data = req.body
    data.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    let result = await positionModel.save(data)
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据添加成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '数据添加失败.'
        })
      })
    }
}
const findOne = async (req, res, next) =>{
  res.set('Content-Type', 'application/json; charset=utf-8')
  let id = req.body.id
  let result =await positionModel.findOne(id)
  if(result){
    res.render('succ',{
      data: JSON.stringify({
        message: result
      })
    })
  }
  else{
    res.render('fail', {
      data: JSON.stringify({
        message: '数据获取.'
      })
    })
  }
}
const update = async(req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let data = req.body
  console.log(data)
  if(req.body.img === ''){
    delete data.img
  }
  else{
    data.img = req.body.img
    fs.unlink(path.resolve(__dirname,`../public/uploads/${data.preimg}`), (err) => {
      if (err) throw err
      console.log('文件已删除')
    })
  }
  let result = await positionModel.update(data)
  if(result){
    res.render('succ',{
      data: JSON.stringify({
        message: '修改成功'
      })
    })
  }
  else{
    res.render('fail', {
      data: JSON.stringify({
        message: '修改失败.'
      })
    })
  }
}
const remove = async(req, res, next) => {
  let {id,img} = req.body
  let result = await positionModel.remove(id)
  if(result){
    res.render('succ',{
      data:JSON.stringify({
        message:'删除成功'
      })
    })
    fs.unlink(path.resolve(__dirname,'../public/uploads/'+img), function(err,files){
      if (err) throw err
      else console.log('文件已删除')
    })
  }
  else{
    res.render('fail',{
      data:JSON.stringify({
        message:'删除失败'
      })
    })
  }
}
const select = async(req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let data = req.body.keywords
  let result = await positionModel.select(data)
  console.log(result)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        list: result
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        list: []
      })
    })
  }
}
const selectkey = async(req, res,next) => {
  let data = req.body.keywords
  console.log(data)
  let result = await positionModel.selectkey(data)
  console.log(result)
}
  module.exports = {
    findAll,
    save,
    findOne,
    update,
    remove,
    select,
    selectkey
  }