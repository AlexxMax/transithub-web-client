export default function({ isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const locale = store.state.locale || app.i18n.fallbackLocale
  const isDriver = store.state.user.isDriver
  if (isDriver && route.fullPath.includes('/workspace')) {
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
}
