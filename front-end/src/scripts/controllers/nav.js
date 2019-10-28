
import loginView from "../views/login.art"
import usersController from "../controllers/users"
import httpModel from "../models/http"
import navView from "../views/nav.art"
class Layout{
    constructor(){
        this.username='1'
        this.render()
        this.isSign = false
    }
    togglebar(){
        $('.sidebar-toggle-box').on('click',function(){
            let flg = $('#nav-accordion').css('display')
                if(flg === 'none'){
                    $('#nav-accordion').show()
                }
                else{
                    $('#nav-accordion').hide()
                }
        })
    }
    async render(){
        let that = this
        await this.isSign()
        $('#myname').html(this.username)
        let html = navView({
            isSign: this.isSign,
        })
        $('header').html(html)
        //bootstrape的菜单点击事件
        this.togglebar()
        //登录
        $('.nav #login').click(async function(){
            let mask = document.createElement('div')
            $(mask).addClass('mask')
            let loghtml = loginView()
            $(mask).html(loghtml)
            $('body').append(mask)
            usersController.render()
            that.togglebar()

            //去注册
            $('.signin .registration a').on('click', function(){
                $('.form-login.signin').css('display','none')
                $('.form-login.signup').css('display','block')
            })
            //去登录
            $('.signup .registration a').on('click', function(){
                $('.form-login.signin').css('display','block')
                $('.form-login.signup').css('display','none')
            })
        })
       
        //退出
        $('.nav #logout').click(async function(){
        let result = await httpModel.post({
          url: '/api/users/signout',
          type:'GET'
        })
        location.reload()
      })
    }
    async isSign(){
        let result = await httpModel.post({
            url: '/api/users/isSignin',
            type:'GET'
        })
        let username = result.data.username
        this.isSign = username ? true : false
        this.username = username
    }
}
export default new Layout()