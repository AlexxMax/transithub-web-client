import { MUTATIONS_KEYS, ACTIONS_KEYS, EDIT_DIALOG_TYPES } from '@/utils/organisations'
import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  list: [],
  item: {},
  loading: false,
  fetched: false,
  editing: {
    type: EDIT_DIALOG_TYPES.CREATE,
    showEditDialog: false,
    showInaccessibleFunctionalityDialog: false
  }
})

export const mutations = {
  [ MUTATIONS_KEYS.CLEAN_LIST ] (state) {
    state.list = []
  },

  [ MUTATIONS_KEYS.SET_LIST ] (state, list) {
    state.list = list
  },

  [ MUTATIONS_KEYS.SET_LOADING ] (state, loading) {
    state.loading = loading
  },

  [ MUTATIONS_KEYS.SET_FETCHED ] (state, fetched) {
    state.fetched = fetched
  },

  [ MUTATIONS_KEYS.REMOVE_ITEM_FROM_LIST ] (state, guid) {
    state.list = state.list.filter(item => item.guid !== guid)
  },

  [ MUTATIONS_KEYS.PREPEND_ITEM_TO_LIST ] (state, item) {
    state.list = [ item, ...state.list ]
  },

  [ MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST ] (state, item) {
    const index = state.list.findIndex(element => element.guid === item.guid)
    if (index != -1) {
      state.list.splice(index, 1, item)
    }
  },

  [ MUTATIONS_KEYS.SET_ITEM ] (state, item) {
    state.item = item
  },

  [ MUTATIONS_KEYS.SHOW_EDIT_DIALOG ] (state, show) {
    state.editing.showEditDialog = show
  },

  [ MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE ] (state, type) {
    state.editing.type = type
  }
}

export const actions = {
  async [ ACTIONS_KEYS.FETCH_LIST ] ({ commit }, companyGuid) {
    commit(MUTATIONS_KEYS.CLEAN_LIST)

    if (!companyGuid) {
      return
    }

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, items } = await this.$api.organisations.getOrganisations(companyGuid)
      if (status) {
        commit(MUTATIONS_KEYS.SET_LIST, items)
        commit(MUTATIONS_KEYS.SET_FETCHED, true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ ACTIONS_KEYS.CREATE_ITEM ] ({ commit }, { companyGuid, payload }) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.organisations.createOrganisation(companyGuid, payload)
      if (status) {
        commit(MUTATIONS_KEYS.PREPEND_ITEM_TO_LIST, item)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  async [ ACTIONS_KEYS.CHANGE_ITEM ] ({ commit }, { companyGuid, organisationGuid, payload}) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.organisations.changeOrganisation(companyGuid, organisationGuid, payload)
      if (status) {
        commit(MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST, item)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  async [ ACTIONS_KEYS.REMOVE_ITEM ] ({ commit }, { companyGuid, organisationGuid }) {
    if (!companyGuid || !organisationGuid) {
      return
    }

    try {
      const { status } = await this.$api.organisations.deleteOrganisation(companyGuid, organisationGuid)
      if (status) {
        commit(MUTATIONS_KEYS.REMOVE_ITEM_FROM_LIST, organisationGuid)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  [ ACTIONS_KEYS.SHOW_EDIT_DIALOG ] ({ commit }, { show, type }) {
    commit(MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE, type)
    commit(MUTATIONS_KEYS.SHOW_EDIT_DIALOG, show)
  },
}
