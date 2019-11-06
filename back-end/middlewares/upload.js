const path = require('path')
const multer = require('multer')
const randomstring = require('randomstring')
var  upload  = multer ({ dest:path.resolve(__dirname,'../public/uploads') })

var filename = ''
const mimetypeMap = {
    'image/png': '.png',
    'image/jpg': '.jpg',
    'image/jpeg': '.jpeg',
    'image/gif': '.gif'
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../public/uploads'))
    },
    filename: function (req, file, cb) {
        let { fieldname, mimetype } = file
        filename = fieldname +'-'+ randomstring.generate(6)+mimetypeMap[mimetype]
        cb(null, filename)
    }
})
   
var upload = multer({
    storage
}).single('img')
module.exports = (req, res, next) => {
    upload(req, res, (err) => {
      req.body.img = filename
      filename = ''
      next()
    })
  }