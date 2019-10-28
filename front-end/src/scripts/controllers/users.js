
import httpModel from '../models/http'
import navView from '../views/nav.art'
class Users {
  constructor(){
    this.timer=''
  }
  render() {
    // 提交
    $('.signup .btn-theme').on('click', this.handleSubmit.bind(this))
    $('.signin .btn-theme').on('click', this.handleSubmitlogin.bind(this))

    //输入
    $('#username').on('input',this.namefilter.bind(this))

  }
  
  async namefilter(){
      if($('#username').val() == ''){
        $('.signup .worning').html('')
      }
      else{
        //防抖
      clearTimeout(this.timer)    
      this.timer = setTimeout(async function(){
        let data = $('.form-login.signup').serialize()
        let result = await httpModel.post({
          url: '/api/users/signupfilter',
          type:'POST',
          data
        })
        if(!result.ret){
          $('.signup .worning').html('用户名已存在')
        }
        else{
          $('.signup .worning').html('')
        }
      },200) 
      }
  }
  async handleSubmit() {
    let data = $('.form-login.signup').serialize()
    let result = await httpModel.post({
      url: '/api/users/signup',
      type:'POST',
      data
    })
    this.handleSubmitSucc(result)
  }
  async handleSubmitlogin(){
    //发送请求查询
    let data = $('.form-login.signin').serialize()
    let result = await httpModel.post({
      url: '/api/users/signin',
      type:'POST',
      data
    })
    this.handleSubmitSucc2(result)
  }

  handleSubmitSucc(result) {
    if(result.ret){
      alert('注册成功！')
      $('.signup').css('display','none')
      $('.signin').css('display','block')
    }
    else{
      alert('用户名已存在')
    }
  }
  handleSubmitSucc2(result) {
    if(result.ret){
      alert('登录成功！')
      $('#myname').html($('#username1').val())
      //登录

      let html = navView({
        isSign:true,
        username:$('#username1').val()
      })
      $('header').html(html)
      $('.mask').remove()
        //点击事件
        $('#nav-accordion .sub-menu').on('click',async function(){
          let result = await httpModel.post({
              url: '/api/users/isSignin',
              type:'GET'
          })
          console.log(result)
      })
      //退出
      $('.nav .logout').click(async function(){
        let result = await httpModel.post({
          url: '/api/users/signout',
          type:'GET'
        })
        location.reload()
      })
    }
    else{
      alert('用户名或密码错误')
    }
  }

}

export default new Users()