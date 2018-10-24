import { getVehiclesRegistesListGroups } from '@/utils/cookies'

export default function({ isHMR, route, redirect, app, store, req }) {
  // // If middleware is called from hot module replacement, ignore it
  // if (isHMR) return

  // const locale = store.state.locale || app.i18n.fallbackLocale
  // const groups = getVehiclesRegistesListGroups(req)
  // if (route.fullPath === `/${locale}/workspace/vehicles-registers`) {
  //   if (groups.length > 0) {
  //     redirect(`/${locale}/workspace/vehicles-registers?grouped=true`)
  //   }
  // }
}
