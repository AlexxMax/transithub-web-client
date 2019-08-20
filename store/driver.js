import _ from 'lodash'

import {
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
} from '@/utils/driver'
import * as notify from '@/utils/notifications'

export const state = () => ({
  guid: '',
  certSerialNumber: '',
  personDocsType: '',
  passSerial: '',
  passNumber: '',
  passDate: '',
  passIssued: '',

  loading: false,
})

export const mutations = {
  [MUTATIONS_KEYS.SET_DRIVER] (state, driver) {
    Object.assign(state, {
      ...state,
      ..._.pick(driver, Object.keys(state))
    })
  },

  [MUTATIONS_KEYS.SET_LOADING] (state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_DRIVER] ({ commit, rootState }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, driver } = await this.$api.driver.getDriver(rootState.user.guid)
      if (status) {
        commit(MUTATIONS_KEYS.SET_DRIVER, driver)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.CREATE_DRIVER] ({ commit, rootState }, payload) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, driver } = await this.$api.driver.createDriver(rootState.user.guid, payload)
      if (status) {
        commit(MUTATIONS_KEYS.SET_DRIVER, driver)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.CHANGE_DRIVER] ({ commit, state, rootState }, payload) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, driver } = await this.$api.driver.changeDriver(
        state.guid,
        rootState.user.guid,
        payload
      )
      if (status) {
        commit(MUTATIONS_KEYS.SET_DRIVER, driver)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  }
}
