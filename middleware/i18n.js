import { getLangFromRoute } from '@/utils/locale'

export default function ({ isHMR, app, store, route, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const locale = store.state.user.language || defaultLocale

  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale

  const localeInRoute = getLangFromRoute(store.state.locales, route.fullPath)
  const localeInRouteParam = route.params.LANG

  if (!localeInRoute) {
    const fullPathArray = route.fullPath.split('/')
    fullPathArray.splice(0, 1)
    if (fullPathArray[0] === localeInRouteParam) {
      fullPathArray.splice(0, 1)
    }
    const path = app.i18n.path(fullPathArray.join('/'))
    return redirect({
      path,
      params: {
        ...route.params,
        LANG: locale
      }
    })
  }

  if (localeInRoute && localeInRoute !== locale) {
    return redirect({
      path: route.path.replace(`/${localeInRoute}/`, `/${locale}/`),
      params: {
        ...route.params,
        LANG: locale
      }
    })
  }
}
