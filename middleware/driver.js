import config from '@/config'
import { RACE_FORM_STEPS, CREATION_TYPES } from '@/utils/driver'

export default function ({ isHMR, route, redirect, app, store, methods }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const useDriverWorkspace = config.sections.useDriverWorkspace

  const locale = store.state.locale || app.i18n.fallbackLocale
  const isDriver = store.state.user.isDriver

  if (
    isDriver
    && useDriverWorkspace
    && (route.fullPath.includes('/workspace'))
  ) {
    return redirect({
      name: 'LANG-driver',
      params: { LANG: locale }
    })
  }

  if ((!useDriverWorkspace || !isDriver) && route.fullPath.includes('/driver')) {
  // if (!isDriver && route.fullPath.includes('/driver')) {
    return redirect({
      name: 'LANG-workspace',
      params: { LANG: locale }
    })
  }

  if (
    isDriver &&
    route.name === 'LANG-driver-new-race-type' &&
    !Object.values(CREATION_TYPES).includes(route.params.type)
  ) {
    return redirect({
      name: 'LANG-driver',
      params: { LANG: locale }
    })
  }

  if (isDriver) {
    if (route.name === 'LANG-driver-new-race-type'
      || route.name === 'LANG-driver-settings-change-password'
      || route.name === 'LANG-driver-settings-user-profile'
      || route.name === 'LANG-driver-settings-driver-profile') {

      const type = route.params.type === CREATION_TYPES.MANUAL ? RACE_FORM_STEPS.MANUAL_CREATION : RACE_FORM_STEPS.START

      app.$methods.driver.setRaceFormActiveStep(type)
      app.$methods.driver.setBottomNavmenuVisible(false)

    } else {
      app.$methods.driver.setBottomNavmenuVisible(true)
    }
  }

}
