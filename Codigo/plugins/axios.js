export default function({ $axios, req }) {
    if (req) {
      let cookies = JSON.parse(getCookie('vuex', req.headers.cookie))
      if (cookies) {
        $axios.defaults.headers.common[
          'x-access-token'
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjM1Mjk4MzgxLCJleHAiOjE2Mzc3MTc1ODF9.emGVE4j4WNOn2lYb3ZZEDPjpJVe_goqHj1-Wx76tcoM`
      }
    }

    $axios.onRequest(config => {
      if (!req)
        config.headers.common['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjM1Mjk4MzgxLCJleHAiOjE2Mzc3MTc1ODF9.emGVE4j4WNOn2lYb3ZZEDPjpJVe_goqHj1-Wx76tcoM'
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
