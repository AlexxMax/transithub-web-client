export default function({ req, isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  if (process.server && !req) return

  const locale = store.state.locale || app.i18n.fallbackLocale
  const logged = Boolean(store.state.user.token)
  if (
    !logged &&
    (route.path !== "/" + locale + "/login"
      && route.path !== "/" + locale + "/"
      && route.path !== "/"
      && route.path !== "/" + locale + "/registration"
      && route.path !== "/" + locale + "/registration/email-check"
      && route.path !== "/" + locale + "/email-confirmation"
      && route.path !== "/" + locale + "/invitation"
      && route.path !== "/" + locale + "/railway-aggregations"
      && route.name !== "LANG-railway-aggregations-guid"
      && route.path !== "/" + locale + "/auto-transportations"
      && route.path !== "/" + locale + "/orders"
      && route.path !== "/" + locale + "/driver")
  ) {
    return redirect("/" + locale + "/login");
  } else if (
    logged &&
    (route.path === "/" + locale + "/login" ||
      route.path === "/" + locale + "/")
  ) {
    return redirect("/" + locale + "/workspace")
  }
}
