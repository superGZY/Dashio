import  SMERouter from 'sme-router'

import {home} from "../controllers/home"
import * as position from '../controllers/position'

const router = new SMERouter('mainwrapper')

router.use((req) => {
    let url = req.url.slice(1)
    for(var i=0; i< $('#nav-accordion a').length; i++){
        $('#nav-accordion li a').eq(i).removeClass('active')
    }
    $(`#nav-accordion a[data-url=${url}]`).addClass('active')
})

router.route('/home', home)
router.route('/position', position.list)
//重定向
router.route('*', (req, res, next) => {
  res.redirect('/home')
})