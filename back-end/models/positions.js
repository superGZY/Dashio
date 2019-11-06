  
const { Positions } = require('../utils/db')

const save = (data) => {
  let position = new Positions(data)
  return position.save()
}
const findAll = async({start,count})=> {
  let list = await Positions.find({}).sort({_id: -1}).limit(~~count).skip(~~start)
  let total =  await Positions.find({}).count()
  return {
    list,
    total
  }
}
const findOne = async(id)=>{
  return await Positions.findById(id)
}
const update = async (data) => {
  return await Positions.findByIdAndUpdate(data._id, data)
}
const remove = async(id) => {
  return await Positions.findByIdAndDelete(id)
}
const select = async(data) => {
  let reg = new RegExp(data,'gi')
  return await Positions.find({}).or([{nm:reg},{rt:reg},{star:reg},{sc:reg}])
}
const selectkey = async(data) => {
  let reg = new RegExp(data,'gi')
  //return await Positions.find([{nm:reg},{star:reg}],{ nm: 1,star: 1 } )
  //return await Positions.find([{nm:reg},{rt:reg},{star:reg},{sc:reg}],{ nm:reg?1:0, star:reg?1:0,rt:reg?1:0 })
}
module.exports = {
  save,
  findAll,
  findOne,
  update,
  remove,
  select,
  selectkey
}