export default {
    post({url, type='POST', data={}}) {
      return $.ajax({
        url,
        type,
        data,
        success: (result) => {
          return result
        }
      })
    }
  }