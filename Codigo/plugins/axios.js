export default function({ $axios, store, req, redirect }) {
  if (req) {
    let cookies = JSON.parse(getCookie('ccorpoc', req.headers.cookie))
    if (cookies) {
      $axios.defaults.headers.common[
        'x-access-token'
      ] = `${cookies.login.token}`
    }
  }

  $axios.onRequest(config => {
    if (!req)
      config.headers.common['x-access-token'] = `${store.getters['login/token']}`
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 403) {
      store.dispatch('login/userLogout', {
        router: null
      })
      redirect('/login')
    }
    // Tratamento de Erro
  })
}

function getCookie(cookieName, stringCookie) {
  let strCookie = new RegExp("" + cookieName + "[^;]+").exec(stringCookie);
  if (strCookie == null) return null;
  else
    return unescape(
      strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, "") : ""
    );
}
