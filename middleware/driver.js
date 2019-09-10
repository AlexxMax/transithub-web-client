import config from '@/config'
import { RACE_FORM_STEPS, CREATION_TYPES } from '@/utils/driver'

export default function ({ isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const useDriverWorkspace = config.sections.useDriverWorkspace

  const locale = store.state.locale || app.i18n.fallbackLocale
  // const isDriver = true
  const isDriver = store.state.user.isDriver

  const words = route.fullPath.split('/')

  if (
    isDriver &&
    useDriverWorkspace &&
    words.find(word => (word === 'workspace'))
  ) {
    return redirect({
      name: 'LANG-driver',
      params: { LANG: locale }
    })
  }

  if ((!useDriverWorkspace || !isDriver) && words.find(word => (word === 'driver'))) {
    return redirect({
      name: 'LANG-workspace',
      params: { LANG: locale }
    })
  }

  if (isDriver) {
    if (route.name === 'LANG-driver-new-race' ||
      route.name === 'LANG-driver-settings-change-password' ||
      route.name === 'LANG-driver-settings-user-profile' ||
      route.name === 'LANG-driver-settings-driver-profile') {
      app.$methods.driver.setBottomNavmenuVisible(false)
    } else {
      app.$methods.driver.setBottomNavmenuVisible(true)
    }
  }

}