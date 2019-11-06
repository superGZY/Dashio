import layoutView from "../views/layout.art"
import httpModel from "../models/http"
class Layout{
    constructor(){
        this.beforerender()
    }
    beforerender(){
        let html = layoutView({
            isSign: false,
            username:localStorage.getItem('username')
        })
        $('#container').html(html)

    }

}
export default new Layout()