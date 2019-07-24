export default function({ isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  const locale = store.state.locale || app.i18n.fallbackLocale
  const { accessAuto, accessRailway } = store.state.companies.userAccess
  if (route.fullPath === '/' + locale + '/workspace') {
    const workspaceLandingRoute = store.state.router.workspaceLandingRoute
    if (workspaceLandingRoute) {
      store.commit('router/CLEAR_WORKSPACE_LANDING_ROUTE')

      switch (workspaceLandingRoute.name) {
        case 'LANG-workspace-railway-aggregations':
        case 'LANG-workspace-railway-aggregations-guid':
          if (accessRailway) {
            return redirect(workspaceLandingRoute)
          }
          return redirect('/' + locale + '/workspace/requests')
        // TODO: add auto routs here
      }
    }

    if (accessAuto) {
      return redirect('/' + locale + '/workspace/requests')
    }

    return redirect('/' + locale + '/workspace/railway-aggregations')
  }
}
