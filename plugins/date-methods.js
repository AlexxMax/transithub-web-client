import moment from 'moment'

Date.prototype.pFormatDate = function() {
  try {
    return moment(this).format('DD.MM.YYYY')
  } catch (error) {
    return ''
  }
}

Date.prototype.pFormatDateTime = function() {
  try {
    return moment(this).format('DD.MM.YYYY HH:mm:ss')
  } catch (error) {
    return ''
  }
}
