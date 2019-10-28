var express = require('express')
var router = express.Router()

let position = require('../controller/position')

router.get('/findAll', position.findAll)
module.exports = router