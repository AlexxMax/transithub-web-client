export default Object.freeze({
  sections: {
    useDriverWorkspace: process.env.USE_DRIVER_WORKSPACE
  },
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
      token: process.env.API_TOKEN
    }
  },
  // google: {
  //   maps: {
  //     apiKey: 'AIzaSyAAn4hNzISJpFeA2Q-YX9YPPvc9t5RUdWU'
  //   }
  // }
})
