export default Object.freeze({
  ui: {
    pagination: {
      pageSize: 10,
      offset: 0,
      currentPage: 1
    },
    sorting: {
      direction: 'desc'
    }
  },
  backend: {
    logistics: {
      token: process.env.apiToken
    }
  }
})
