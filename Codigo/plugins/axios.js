export default function({ $axios, req }) {
    if (req) {
      let cookies = JSON.parse(getCookie('vuex', req.headers.cookie))
      if (cookies) {
        $axios.defaults.headers.common[
          'x-access-token'
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzNzg2NDc0LCJleHAiOjE2MzQzOTEyNzR9.Uf2Fa-y1DiZKieeuz-dRz7jzMeia-W1CMtrN7y5GU5o`
      }
    }

    $axios.onRequest(config => {
      if (!req)
        config.headers.common['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzNzg2NDc0LCJleHAiOjE2MzQzOTEyNzR9.Uf2Fa-y1DiZKieeuz-dRz7jzMeia-W1CMtrN7y5GU5o'
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
