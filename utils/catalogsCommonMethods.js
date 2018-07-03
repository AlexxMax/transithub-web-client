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

export const generateTaxSchemeFormSelectOption = (locale, guid, nameUa, nameRu, nds) => {
  // let _nds = ''
  // if (locale === 'ru') {
  //   _nds = 'Не плательщик НДС'
  //   if (nds == 1) {
  //     _nds = 'Плательщик НДС'
  //   }
  // } else {
  //   _nds = 'Не платник ПДВ'
  //   if (nds == 1) {
  //     _nds = 'Платник ПДВ'
  //   }
  // }

  // return {
  //   value: guid,
  //   title: locale === 'ru' ? nameRu : nameUa,
  //   nds: _nds
  // }

  // *** Ukraine language only
  return {
    value: guid,
    title: nameUa,
    nds: nds === 1 ? 'Платник ПДВ' : 'Не платник ПДВ'
  }
}
