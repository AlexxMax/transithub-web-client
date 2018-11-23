export const getLangFromRoute = (locales, fullPath) => {
  for (const locale of locales) {
    if (fullPath.indexOf('/' + locale) === 0) {
      return locale
    }
  }
  return null
}

export const getLangFromStore = (store) => (
  store.state.locale
)
