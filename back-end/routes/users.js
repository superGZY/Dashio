var express = require('express')
var router = express.Router()

const { signup, hasUsername, signin,signupfilter, isSignin, signout} = require('../controller/users')

router.post('/signup',hasUsername, signup)
router.post('/signin', signin)
router.post('/signupfilter',signupfilter)
router.get('/isSignin', isSignin)
router.get('/signout', signout)

module.exports = router
