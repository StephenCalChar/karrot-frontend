import axios from '@/services/axios'
import { convert as convertConversation } from '@/services/api/conversations'

export default {
  async get (id) {
    return (await axios.get(`/api/users/${id}/`)).data
  },

  async list () {
    return (await axios.get('/api/users/')).data
  },

  async search (query) {
    return (await axios.get('/api/users/', { params: { search: query } })).data
  },

  requestDeleteAccount () {
    // TODO: move to authuser API file
    return axios.post('/api/auth/user/request_delete/')
  },

  deleteAccount (code) {
    // TODO: move to authuser API file
    return axios.delete('/api/auth/user/', { params: { code: code } })
  },

  async conversation (userId) {
    return convertConversation((await axios.get(`/api/users/${userId}/conversation/`)).data)
  },
}
