import moment from 'moment'

const API_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm:ss'
const API_DATE_FORMAT = 'DD.MM.YYYY'

export const formatDate = date => {
  return moment(date).format(API_DATE_FORMAT)
}

export const formatDateTime = datetime => {
  return moment(datetime).format(API_DATE_TIME_FORMAT)
}
