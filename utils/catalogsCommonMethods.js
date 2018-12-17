export const generateOrganisationFormSelectOption = (locale, guid, nameUa, nameRu, abbrUa, abbrRu, type) => {
  // return {
  //   value: guid,
  //   title: locale === 'ru' ? `${nameRu} (${abbrRu})` : `${nameUa} (${abbrUa})`,
  //   name: locale === 'ru' ? nameRu : nameUa,
  //   abbr: locale === 'ru' ? abbrRu : abbrUa,
  //   type: type === 'jur' ? 'Юр. лице' : ''
  // }

  // *** Ukraine language only
  return {
    value: guid,
    title: `${nameUa} (${abbrUa})`,
    name: nameUa,
    abbr: abbrUa,
    type: type === 'jur' ? 'Юр. лице' : ''
  }
}
