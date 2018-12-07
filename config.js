import secret from "@/.transithub.secret.json"

export default {
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
      token: secret.apiToken || ''
    }
  }
}
