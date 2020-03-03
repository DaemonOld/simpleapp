import axios from 'axios'

export default {
  state: {
    token: localStorage.getItem('user-token') || null,
    user: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    token: state => state.token,
    user: state => state.user
  },
  mutations: {
      setToken: (state, token) => {
        state.token = token
      },
      setUser: (state, user) => {
        state.user = user
      },
      clearData: (state) => {
        state.token = null
        state.user = {}
      },
  },
  actions: {
    async login({dispatch, commit}, data) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', data)
        const token = response.data.token
        commit('setToken', token)
        localStorage.setItem('user-token', token)
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
      } catch (e) {
        localStorage.removeItem('user-token')
        delete axios.defaults.headers.common['Authorization']
        throw e
      }
    },
    async logout({commit}) {
      try {
        localStorage.removeItem('user-token')
        commit('clearData')
        delete axios.defaults.headers.common['Authorization']
      } catch (e) {
          throw e
      }
    },
    async fetchUser({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/user')
        const user = response.data.user
        commit('setUser', user)
      } catch (e) {
        throw e
      }
    },
  }
}
