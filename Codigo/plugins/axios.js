export default function({ $axios, req }) {
    if (req) {
      let cookies = JSON.parse(getCookie('vuex', req.headers.cookie))
      if (cookies) {
        $axios.defaults.headers.common[
          'x-access-token'
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzOTE4NjMyLCJleHAiOjE2MzYzMzc4MzJ9.F8wHvq8rS8q3ZA-9pNeT8f-ZTv2B9I7Ew38h7CCjkaE`
      }
    }

    $axios.onRequest(config => {
      if (!req)
        config.headers.common['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzOTE4NjMyLCJleHAiOjE2MzYzMzc4MzJ9.F8wHvq8rS8q3ZA-9pNeT8f-ZTv2B9I7Ew38h7CCjkaE'
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
