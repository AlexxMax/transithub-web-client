import createPersistedState from 'vuex-persistedstate'

export default ({
  store
}) => {
  createPersistedState({
    key: 'transithub',
    paths: ['userSettings']
  })(store)
}
