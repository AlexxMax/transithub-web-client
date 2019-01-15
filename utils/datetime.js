import moment from 'moment'

export const onlyCurrentDateSelector = {
  disabledDate: date => {
		console.log("​date", date)

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
