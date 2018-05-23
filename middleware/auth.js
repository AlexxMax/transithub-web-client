import { getToken } from '@/utils/cookies';

export default function ({ req, isHMR, route, redirect, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  if (process.server && !req) return

  const locale = store.state.locale || app.i18n.fallbackLocale
  const logged = process.server ? getToken(req) : store.getters['user/isAuthenticated']
  if (!logged && (route.fullPath !== '/' + locale + '/login' && route.fullPath !== '/' + locale + '/' && route.fullPath !== '/' && route.fullPath !== '/' + locale + '/registration')) {
    return redirect('/' + locale + '/login')
  } else if (logged && (route.fullPath === '/' + locale + '/login' || route.fullPath === '/' + locale + '/')) {
    return redirect('/' + locale + '/workspace/orders')
  }
}
