// import router from './router'
export const state = () => ({
  token: null,
  me: {
    nome: null,
    tipo: null,
    id: null
  }
});

export const mutations = {
  LOGIN(state, token) {
    state.token = token;
  },
  LOGOUT(state) {
    state.token = null;
  },
  ME(state, user) {
    state.me = user;
  }
};

export const actions = {
  userLogin({ commit }, { loginData, nome, tipo, id, router }) {
    commit("LOGIN", loginData);
    commit("ME", {
      nome,
      tipo,
      id
    });
    if (tipo == "M") router.push("/medico/info");
    else if (["A", "CC", "DC", "DT"]) router.push("/medico");
  },
  async userLogout({ commit }, { router }) {
    if (router) await router.push("/login");
    commit("LOGOUT");
  },
  setToken({ commit }, token) {
    return commit("LOGIN", token);
  }
};

export const getters = {
  token(state) {
    return state.token;
  },
  me(state) {
    return state.me;
  }
};
