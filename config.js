// import fs from 'fs'

const path = '@/.transithub.secret.json'

let apiToken = process.env.API_TOKEN || ''

if (!apiToken) {
  try {
    // if (fs.existsSync(path)) {
    //   const rawSecret = fs.readFileSync(path)
    //   const secret = JSON.parse(rawSecret)
    //   apiToken = secret.apiToken
    // }
    const secret = require('./.transithub.secret.json')
    apiToken = secret.apiToken
  } catch (error) {
    console.error(`Can\'t find file: ${path}`)
  }
}

const config = {
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
      token: apiToken
    }
  }
}

export default config
