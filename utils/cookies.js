import Cookie from 'js-cookie'
import cookie from 'cookie'

import config from '@/config'

export const setUserId = userId => {
  Cookie.set('userId', userId, { expires: config.cookie.expires })
}

export const getUserId = (req) => {
  if (req.headers.cookie) {
    const { userId } = cookie.parse(req.headers.cookie)
    return userId
  }
  return null
}

export const unsetUserId = () => {
  Cookie.remove('userId')
}


// TOKEN

export const setToken = token => {
  Cookie.set('token', token, { expires: config.cookie.expires })
}

export const getToken = (req) => {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie)
    return token
  }
  return null
}

export const unsetToken = () => {
  Cookie.remove('token')
}


// COMPANY'S WORKSPACE NAME

export const setCurrentCompanyWorkspaceName = currentCompanyWorkspaceName => {
  Cookie.set('currentCompanyWorkspaceName', currentCompanyWorkspaceName)
}

export const getCurrentCompanyWorkspaceName = (req) => {
  if (req.headers.cookie) {
    const { currentCompanyWorkspaceName } = cookie.parse(req.headers.cookie)
    return currentCompanyWorkspaceName
  }
  return null
}

export const unsetCurrentCompanyWorkspaceName = () => {
  Cookie.remove('currentCompanyWorkspaceName')
}

// USER'S SETTINGS

export const setNavmenuCollapseState = state => {
  Cookie.set('userSettings.navmenu.collapse', state)
}

export const getNavmenuCollapseState = req => {
  if (req.headers.cookie) {
    const { 'userSettings.navmenu.collapse': collapse } = cookie.parse(req.headers.cookie)
    return collapse || true
  }
  return true
}

// export const setVehiclesRegistesListGroups = state => {
//   Cookie.set('userSettings.vehiclesRegisters.list.groups', state)
// }

// export const getVehiclesRegistesListGroups = req => {
//   if (req.headers.cookie) {
//     const { 'userSettings.vehiclesRegisters.list.groups': groups } = cookie.parse(req.headers.cookie)
//     return groups || []
//   }
//   return []
// }
