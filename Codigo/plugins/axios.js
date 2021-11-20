export default function ({ $axios, req }) {
  if (req) {
    let cookies = JSON.parse(getCookie("vuex", req.headers.cookie));
    if (cookies) {
      $axios.defaults.headers.common[
        "x-access-token"
      ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM3NDE4NDAzLCJleHAiOjE2Mzk4Mzc2MDN9.OSxess3Z_f6ihBBeiwfn8qJ4U3HVIXYhZZ0r5QkOYuA`;
    }
  }

  $axios.onRequest((config) => {
    if (!req)
      config.headers.common["x-access-token"] =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM3NDE4NDAzLCJleHAiOjE2Mzk4Mzc2MDN9.OSxess3Z_f6ihBBeiwfn8qJ4U3HVIXYhZZ0r5QkOYuA";
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
