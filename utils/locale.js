export const getLangFromRoute = (locales = null, fullPath) => {
  if (locales) {
    for (const locale of locales) {
      if (fullPath.indexOf('/' + locale) === 0) {
        return locale
      }
    }
  } else {
    const fullPathArray = fullPath.split('/')
    if (fullPathArray.length >= 1) {
      return fullPathArray[1]
    }
  }
  return null
}

export const getLangFromStore = (store) => (
  store.state.locale
)