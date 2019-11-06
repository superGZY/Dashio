import  SMERouter from 'sme-router'
import titleView from '../views/title.art'
import {home} from "../controllers/home"
import * as position from '../controllers/position'

const router = new SMERouter('mainwrapper')

router.use((req) => {
    let preurl = req.url.slice(1).split('?')[0].split('/')[0]
    let url = req.url.slice(1).split('_')[0].split('?')[0].split('/')[0]
    for(var i=0; i< $('#nav-accordion a').length; i++){
        $('#nav-accordion li a').eq(i).removeClass('active')
    }
    $(`#nav-accordion a[data-url=${url}]`).addClass('active')


    //面包屑处理
    let BreadcrumbMap = {
      'home': {
        level1: '信息管理系统',
        level2: '首页',
        level3: '',
        href1:'#/home',
        href2:'#/home',
        href3:''
      },
      'position': {
        level1: '信息管理系统',
        level2: '电影管理',
        level3: '',
        href1:'#/home',
        href2:'#/position',
        href3:''
      },
      'position_list': {
        level1: '信息管理系统',
        level2: '电影管理',
        level3: '',
        href1:'#/home',
        href2:'#/position',
        href3:''
      },
      'position_add': {
        level1: '信息管理系统',
        level2: '电影管理',
        level3: '电影添加',
        href1:'#/home',
        href2:'#/position',
        href3:'#/position_add'
      },
      'position_update': {
        level1: '信息管理系统',
        level2: '电影管理',
        level3: '电影信息修改',
        href1:'#/home',
        href2:'#/position',
        href3:'#/position_update'
      }
    }


    let  Breadcrumb = {
        "level1": BreadcrumbMap[preurl].level1,
        "level2": BreadcrumbMap[preurl].level2,
        "level3": BreadcrumbMap[preurl].level3,
        "href1": BreadcrumbMap[preurl].href1,
        "href2": BreadcrumbMap[preurl].href2,
        "href3": BreadcrumbMap[preurl].href3
    }
    //title渲染
    let html = titleView({
      title:Breadcrumb
    })
    $('#main-content .title').html(html)
  })

router.route('/home', home)
router.route('/position', position.list)
router.route('/position_add', position.add)
router.route('/position_update', position.update)
router.route('/position_list/:page', position.list)
//重定向
router.route('*', (req, res, next) => {
  res.redirect('/home')
})