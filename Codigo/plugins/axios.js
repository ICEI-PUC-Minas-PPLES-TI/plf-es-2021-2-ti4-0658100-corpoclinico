export default function({ $axios, req }) {
    if (req) {
      let cookies = JSON.parse(getCookie('vuex', req.headers.cookie))
      if (cookies) {
        $axios.defaults.headers.common[
          'x-access-token'
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4NjI1ODk1LCJleHAiOjE2NDEwNDUwOTV9.eiZno16YshjYs91bmZcG-IaIKYCktOZ94m81kjCaay8`
      }
    }

    $axios.onRequest(config => {
      if (!req)
        config.headers.common['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4NjI1ODk1LCJleHAiOjE2NDEwNDUwOTV9.eiZno16YshjYs91bmZcG-IaIKYCktOZ94m81kjCaay8'
    })

    $axios.onError(error => {
      // Tratamento de Erro
    })
  }

  function getCookie(cookieName, stringCookie) {
    let strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)
    if (strCookie == null) return null
    else
      return unescape(
        strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : ''
      )
  }
