import layoutView from "../views/layout.art"
import httpModel from "../models/http"
class Layout{
    constructor(){
        this.beforerender()
    }
    beforerender(){
        let html = layoutView({
            isSign: false,
            username:''
        })
        $('#container').html(html)
         //点击事件
         $('#nav-accordion .sub-menu').on('click',this.isSign)
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