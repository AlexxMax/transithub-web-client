import { RACE_FORM_STEPS, CREATION_TYPES } from '@/utils/driver'

export default function ({ isHMR, route, redirect, app, store, methods }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const locale = store.state.locale || app.i18n.fallbackLocale
  const isDriver = store.state.user.isDriver

  if (
    isDriver &&
    (route.fullPath.includes('/workspace'))
  ) {
    return redirect({
      name: 'LANG-driver',
      params: { LANG: locale }
    })
  }

  if (!isDriver && route.fullPath.includes('/driver')) {
    return redirect({
      name: 'LANG-workspace',
      params: { LANG: locale }
    })
  }

  if (isDriver) {
    if (route.name === 'LANG-driver-new-race') {
      app.$methods.driver.setBottomNavmenuVisible(false)
    } else {
      app.$methods.driver.setBottomNavmenuVisible(true)
    }
  }

}