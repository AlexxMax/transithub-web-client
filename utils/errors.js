const ERRORS_KEYS = Object.freeze({
  'ORA-20001: V_NUMBER_EXISTS': 'vehicleNumberExists',
  'NO_VEHICLES_REGISTER_FOUND': 'vehicleRegisterNotExists'
})

export const getErrorMessage = function(context, errorKey) {
  let messageKey = errorKey
  if (ERRORS_KEYS.hasOwnProperty(errorKey)) {
    messageKey = ERRORS_KEYS[errorKey]
  }
  return context.$t(`messages.${messageKey}`)
}
