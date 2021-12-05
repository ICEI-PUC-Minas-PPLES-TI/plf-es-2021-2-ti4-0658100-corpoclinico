export default function ({ $axios, req }) {
  if (req) {
    let cookies = JSON.parse(getCookie("vuex", req.headers.cookie));
    if (cookies) {
      $axios.defaults.headers.common[
        "x-access-token"
      ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjM4MzExNjYwLCJleHAiOjE2NDA3MzA4NjB9.0M_K3wYHQLjWvbxk0MihpnF_XStcgPZXgvq8R7WgEW0`;
    }
  }

  $axios.onRequest((config) => {
    if (!req)
      config.headers.common["x-access-token"] =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjM4MzExNjYwLCJleHAiOjE2NDA3MzA4NjB9.0M_K3wYHQLjWvbxk0MihpnF_XStcgPZXgvq8R7WgEW0";
  });

  $axios.onError((error) => {
    // Tratamento de Erro
  });
}

function getCookie(cookieName, stringCookie) {
  let strCookie = new RegExp("" + cookieName + "[^;]+").exec(stringCookie);
  if (strCookie == null) return null;
  else
    return unescape(
      strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, "") : ""
    );
}
