import positionView from "../views/position.art"
import http from "../models/http"

/* export const position = (req, res, next)=>{
    res.render(positionView())
} */
export const list = async (req, res, next) => {
    let result = await http.post({
      url: '/api/position/findAll',
      type:'GET'
    })
    if (result.ret) {
      res.render(positionView()) 
    } else {
      res.go('/home')
    }
}