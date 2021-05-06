import Vue from 'vue'
import Vuex from 'vuex'

import userdata from './userdata'

import { vuexOidcCreateStoreModule } from 'vuex-oidc'

import { oidcSettings } from '../config/oidc'

Vue.use(Vuex)

const oidcStore = vuexOidcCreateStoreModule(oidcSettings, {}, {
  userLoaded: (user) => {
    store.commit('userdata/login', {
      id: user.profile.preferred_username,
      name: user.profile.name
    })
  },
  userUnloaded: () => {
    store.commit('userdata/logout')
    console.log('OIDC user is unloaded')
  },
  accessTokenExpiring: () => console.log('Access token will expire'),
  accessTokenExpired: () => console.log('Access token did expire'),
  silentRenewError: () => console.log('OIDC user is unloaded'),
  userSignedOut: () => console.log('OIDC user is signed out'),
  oidcError: (payload) => console.log(`An error occured at ${payload.context}:`, payload.error),
  automaticSilentRenewError: (payload) => console.log('Automatic silent renew failed.', payload.error)
}
)

const store = new Vuex.Store({
  modules: {
    userdata, oidcStore
  },
  base: process.env.BASE_URL,
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})

export default store
