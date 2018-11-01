export default function({ req, isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  if (process.server && !req) return;

  const locale = store.state.locale || app.i18n.fallbackLocale;
  const logged = store.getters["user/isAuthenticated"];
  if (
    !logged &&
    (route.path !== "/" + locale + "/login" &&
      route.path !== "/" + locale + "/" &&
      route.path !== "/" &&
      route.path !== "/" + locale + "/registration" &&
      route.path !== "/" + locale + "/registration/email-check" &&
      route.path !== "/" + locale + "/email-confirmation" &&
      route.path !== "/" + locale + "/invitation")
  ) {
    return redirect("/" + locale + "/login");
  } else if (
    logged &&
    (route.path === "/" + locale + "/login" ||
      route.path === "/" + locale + "/")
  ) {
    return redirect("/" + locale + "/workspace/requests");
  }
}
