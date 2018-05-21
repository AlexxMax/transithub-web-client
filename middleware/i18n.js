import { getLangFromRoute } from '@/utils/locale'

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  // Get locale from params
  // const locale = params.lang || defaultLocale
  const locale = getLangFromRoute(store.state.locales, route.fullPath) || defaultLocale // we dont use <nuxt-link> in navbar, we use <el-menu-item :route>
  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === -1) {
    const toReplace = '^/'
    const re = new RegExp(toReplace)
    return redirect(
      route.fullPath.replace(re, '/' + locale + '/')
    )
  }
}
