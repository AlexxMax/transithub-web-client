import generateApi from '@/utils/api'
import generateRights from '@/utils/rights'

const copyObjectWithoutReactivity = function(source) {
  if (source) {
    if (Object.prototype.toString.call(source) === '[object Object]') {
      return JSON.parse(JSON.stringify(source))
    } else if (Object.prototype.toString.call(source) === '[object Array]') {
      return source.map(item => (JSON.parse(JSON.stringify(item))))
    }
  }
  return source
}

export default (context, inject) => {
  inject('api', generateApi(context))
  inject('rights', generateRights(context))
  inject('copyObjectWithoutReactivity', copyObjectWithoutReactivity)
}
