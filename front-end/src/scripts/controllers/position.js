import positionView from "../views/position.art"
import http from "../models/http"
import possionaddView from "../views/positionadd.art"
import positionupdateView from "../views/positionupdate.art"

//获取所有数据
export const list = async (req, res, next) => {
    let count = 3
    let currentPage = req.params.page || 1
    let result = await http.post({
      url: '/api/position',
      type:'GET',
      data:{
        start:(currentPage-1)*count,
        count:count
      }
    })
    if (result.ret) {
      let pageCount = new Array(Math.ceil(result.data.total/count))
      if(result.data.list.length ==0 && currentPage>1){
        res.go('/position_list/'+ (currentPage-1))
      }
      let {list} = result.data
      res.render(positionView({
        list:list,
        pageCount,
        currentPage,
      })) 
      //点击添加按钮
      _handleAddClick(res)
    } 
    else {
      res.go('/home')
    }
    //修改
    $('td .updatebtn').on('click', function(){
      _handleUpdateClick(res, this)
    })
    //删除
    $('td .removebtn').on('click', function(){
      _handleDeleteClick(req,res, this)
    })
    //搜索
    $('body').on('keyup','.form-control', function(e){
      if (e.keyCode === 13) {
        _handleSelectClick(res, $('.form-control').val())
      }
    })
    $('body').on('click', '.input-group-btn .btn-default', (e) => {
      _handleSelectClick(res, $('.form-control').val())
    })
    $('.box-footer a.page-number').on('click', function() {
      _handlePageNumberClick(req, res, this)
    })
    $('.box-footer a.page-pre').on('click', function() {
      _handlePageNumberClick(req, res, this,'pre')
    })
    $('.box-footer a.page-next').on('click', function() {
      _handlePageNumberClick(req, res, this,'next',pageCount)
    })
}
function  _handlePageNumberClick(req, res, obj,flag,pageCount){
  if(flag){
    let page = req.params.page || 1
    if( flag === 'pre' && page>1){
      res.go('/position_list/' + (page-1))
    }
    else if(flag === 'next' && page<pageCount.length){
      res.go('/position_list/' + (~~page+1))
    }
  }else{
    res.go('/position_list/' + ~~$(obj).text())
  }
}
function _handleAddClick(res) {
  $('#btn-add').on('click', () => {
    res.go('/position_add')
  })
}
function _handleUpdateClick(res, obj) {
  let id = $(obj).attr('data-id')
  res.go('/position_update', {id})
}
async function _handleDeleteClick(req, res,ele){
  console.log(req)
  let id = $(ele).attr('data-id')
  let img = $(ele).attr('data-img')
  let result = await http.post({
    url:'/api/position',
    type:'delete',
    data:{id,img}
  })
  if(result.ret){
    alert('删除成功')
    res.go('/position_list/'+ req.params.page+'?r=' + (new Date().getTime()))
  }
}
async function _handleSelectClick(res, keywords){
  if(keywords === ''){
    res.go('/position_list/1')
  }
  let result = await http.post({
    url:'/api/position/select',
    type:'POST',
    data:{
      keywords
    }
  })
  res.render(positionView({
    list:result.data.list,
    from:'search'
  }))
}
export const add = async (req, res, next) => {
  res.render(possionaddView())
  $('.box-footer .btn-default').on('click', function(){
    res.go('/position')
  })
  $('#img').on('change', function(){
    setImagePreview('img','preview')
  })
  //添加
  $("#positionaddForm").ajaxForm({
    headers : {"x-access-token" : localStorage.getItem('token')},
    success : function(data){
      alert('添加成功')
      $("#positionaddForm").get(0).reset()
      res.go('/position')
    }
  })
}
//修改
export const update = async (req, res, next) => {
  let id = req.body.id
  let result = await http.post({
    url: '/api/position/findOne',
    data: {
      id
    }
  })
  res.render(positionupdateView({
    list:result.data.message
  })) 
  $('#img2').on('change', function(){
    $('#img2').attr('src','')
    setImagePreview('img2','preview2')
  })
  $('.box-footer .btn-default').on('click', function(){
    res.back()
  })
  $('#filmUpdateForm').ajaxForm({
    resetForm: true,
    headers : {"x-access-token" : localStorage.getItem('token')},
    type:'patch',
    success : function(data){
      alert('修改成功')   
      res.back()
    }
  })
}
function setImagePreview(id1, id2) {
  //input
  var docObj = document.getElementById(id1);
  //img
  var imgObjPreview = document.getElementById(id2);
  //div
  if (docObj.files && docObj.files[0]) {
      //火狐下，直接设img属性
      imgObjPreview.style.display = 'block';
      imgObjPreview.style.width = '64px';
      imgObjPreview.style.height = '90px';
      //imgObjPreview.src = docObj.files[0].getAsDataURL();
      //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
     imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
  } else {
      //IE下，使用滤镜
      docObj.select();
      var imgSrc = document.selection.createRange().text;
      var localImagId = document.getElementById("localImag");
      //必须设置初始大小
      localImagId.style.width = "64px";
      localImagId.style.height = "90px";
      //图片异常的捕捉，防止用户修改后缀来伪造图片
      try {
          localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
          localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
      } catch(e) {
          alert("您上传的图片格式不正确，请重新选择!");
          return false;
      }
      imgObjPreview.style.display = 'none';
      document.selection.empty();
  }
  return true;
}