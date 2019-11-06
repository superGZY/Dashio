import store from 'store'


export default {
    post({url, type='POST', data={}}) {
      let token = store.get('token')
      return $.ajax({
        url,
        type,
        data,
        headers: {
          'X-Access-Token': token
        },
        success: (result,textStatus,jqXHR) => {
          let token = jqXHR.getResponseHeader('x-access-token')
          if (token) {
            store.set('token', token)
            store.set('username',result.data.username)
          }
          return result
        }
      })
    }
  }