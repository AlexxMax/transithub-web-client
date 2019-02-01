export default function({ isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const locale = store.state.locale || app.i18n.fallbackLocale
  if (route.fullPath === '/' + locale + '/workspace') {
    const workspaceLandingRoute = store.state.router.workspaceLandingRoute
    if (workspaceLandingRoute) {
      store.commit('router/CLEAR_WORKSPACE_LANDING_ROUTE')
      return redirect(workspaceLandingRoute)
    }
    return redirect('/' + locale + '/workspace/railway-aggregations')
  }
}
