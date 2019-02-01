import moment from 'moment'

export const onlyCurrentDateSelector = {
  disabledDate: date => {
		const currentDate = moment().startOf('day')
    if (date) {
      return currentDate.isAfter(date)
    }
    return false
  }
}

export default (options = {}) => ({
  firstDayOfWeek: 1,
  ...options
})

export class DatePeriod {
  constructor(dateFrom, dateTo) {
    this.from = dateFrom ? new Date(dateFrom) : null
    this.to =  dateTo ? new Date(dateTo) : null
  }

  get period() {
    if (this.from === null && this.to === null) {
      return null
    }
    return [ this.from, this.to ]
  }
}
