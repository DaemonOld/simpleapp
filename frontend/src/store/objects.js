import axios from 'axios'

export default {
  state: {
      objects: [],
      objectTypes: []
  },
  getters: {
    objects: state => state.objects,
    objectTypes: state => state.objectTypes
  },
  mutations: {
    setObjects: (state, objects) => {
      state.objects = objects
    },
    updateObjects: (state, object) => {
      state.objects.push(object)
    },
    setObjectTypes: (state, objectTypes) => {
      state.objectTypes = objectTypes
    },
    clearData: (state) => {
      state.objects = []
      state.objectTypes = []
    },
  },
  actions: {
    async fetchObcjets({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/objects')
        const objects = response.data
        commit('setObjects', objects)
      } catch (e) {
        throw e
      }
    },
    async fetchObcjetTypes({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/objecttypes')
        const objectTypes = response.data
        commit('setObjectTypes', objectTypes)
      } catch (e) {
        throw e
      }
    },
    async addObject({dispatch, commit}, data) {
      try {
        const response = await axios.post('http://localhost:8000/api/objects/', data)
        const object = response.data
        commit('updateObjects', object)
        return object
      } catch (e) {
        throw e
      }
    }
  }
}
