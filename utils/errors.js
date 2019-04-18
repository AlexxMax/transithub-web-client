const ERRORS_KEYS = Object.freeze({
  'ORA-20001: V_NUMBER_EXISTS': 'vehicleNumberExists'
})

export const getErrorMessage = function(context, errorKey) {
  let messageKey = errorKey
  if (ERRORS_KEYS.hasOwnProperty(errorKey)) {
    messageKey = ERRORS_KEYS[errorKey]
  }
  return context.$t(`errors.${messageKey}`)
}
