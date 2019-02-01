export default Object.freeze({
  ui: {
    pagination: {
      pageSize: 25,
      offset: 0,
      currentPage: 1
    },
    sorting: {
      direction: 'desc'
    },
    messages: {
      duration: 8000
    }
  },
  crypto: {
    key: 'transithub-kernel-ua'
  },
  backend: {
    logistics: {
      token: process.env.apiToken
    }
  }
})
