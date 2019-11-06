import homeView from "../views/home.art"

export const home = (req, res, next) => {
    res.render(homeView())

/*     var socket = io.connect('http://10.9.49.176:3001');
    const content = $('#messagebox')
    document.querySelector('#mes-btn')
      .addEventListener('click', function () {
        var msg2 = msg.value
        socket.emit('receive', msg2)
        msg.value = ''
        content.innerHTML += msg2 + '<br/>'
      }, false)

      socket.on('message', function(msg){
        content.innerHTML += msg + '<br/>'
      }) */
}