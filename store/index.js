import axios from 'axios'

export const state = () => ({
  host: null,
})

export const mutations = {
  SET_HOST (state, payload) {
    state.host = payload
  }
}

export const actions = {
  async nuxtServerInit ({commit}, {req}) {
    await commit('SET_HOST', req.headers.host)
  },
  async getUrlData ({state}, url) {
    const res = await axios.get(`https://${state.host}/api/url/${url}`)
    return res.data
  },
  async createUrl ({state}, url) {
    const res = await axios.post(`https://${state.host}/api/url`, {
      params: {
        originalUrl: url
      }
    })

    return res?.data?.data
  }
}
