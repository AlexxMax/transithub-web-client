const STATUS = Object.freeze({
  REGISTERED: {
    localeKey: 'forms.vehicleRegister.status.active',
    color: '#67C23A'
  }
})

export const getStatus = status => STATUS[status] || STATUS.REGISTERED