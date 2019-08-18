import Vue  from 'vue'
import Vuex from 'vuex'
import post from './store/modules/post'
import auth from './store/modules/auth'
import user from './store/modules/user'

import * as mutations from './store/mutations'
import * as actions   from './store/actions'
import * as getters   from './store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  getters,
  modules: {
    post,
    auth,
    user
  }
})
