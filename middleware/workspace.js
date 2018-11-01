export default function({ isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const locale = store.state.locale || app.i18n.fallbackLocale
  if (route.fullPath === '/' + locale + '/workspace') {
    return redirect('/' + locale + '/workspace/requests')
  }
}
