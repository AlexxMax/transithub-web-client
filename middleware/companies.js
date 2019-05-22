export default function({ isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  if (route.name === 'LANG-company-profile') {
    return redirect({
      name: 'LANG-workspace-companies-guid',
      params: {
        LANG: store.state.locale || app.i18n.fallbackLocale,
        guid: store.state.companies.currentCompany.guid
      }
    })
  }
}
