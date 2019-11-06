const isSignin = function(req, res, next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    let token = req.get('X-Access-Token')
    if (token) {
      if (req.path === '/isSignin') {
        res.render('succ', {
          data: JSON.stringify({
            username: req.session.username
          })
        })
      } else {
        next()
      }
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '没有权限.'
        })
      })
    }
}
module.exports = isSignin