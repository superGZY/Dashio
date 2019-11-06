var express = require('express')
var router = express.Router()

let position = require('../controller/position')
let uploadMiddleware = require('../middlewares/upload')

router.route('/')
  .get(position.findAll)
  .post(uploadMiddleware,position.save)
  .patch(uploadMiddleware,position.update)
  .delete(position.remove)
router.post('/findOne',position.findOne)
router.post('/select',position.select)
router.post('/selectkey', position.selectkey)
module.exports = router