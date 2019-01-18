export default function({ req, isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  if (process.server && !req) return

  const logged = !!store.state.user.token

  if (logged) {
    switch (route.name) {
      case 'LANG-railway-aggregations':
        redirect({
          name: 'LANG-workspace-railway-aggregations',
          params: route.params
        })
        break;
      case 'LANG-railway-aggregations-guid':
        redirect({
          name: 'LANG-workspace-railway-aggregations-guid',
          params: route.params
        })
        break;
    }
  }
}
