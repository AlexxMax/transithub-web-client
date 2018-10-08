import moment from 'moment'

const isValidDate = date => {
  if (date instanceof Date && !isNaN(date)) {
    return true
  }
  return false
}

Date.prototype.pFormatDate = function() {
  if (isValidDate(this)) {
    try {
      return moment(this).format('DD.MM.YYYY')
    } catch (error) {
      return ''
    }
  }
  return ''
}

Date.prototype.pFormatDateTime = function() {
  if (isValidDate(this)) {
    try {
      return moment(this).format('DD.MM.YYYY HH:mm:ss')
    } catch (error) {
      return ''
    }
  }
  return ''
}
