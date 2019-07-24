import Router from '@/utils/router'

export default function({ req, isHMR, route, redirect, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  if (process.server && !req) return

  const logged = !!store.state.user.token
  if (logged
    && (route.name === 'LANG-railway-aggregations' || route.name === 'LANG-railway-aggregations-guid')
  ) {
    return redirect(Router.getWorkspaceRoute(route))
  }
}
