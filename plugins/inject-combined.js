import generateApi from '@/utils/api'
import generateRights from '@/utils/rights'

export default (context, inject) => {
  inject('api', generateApi(context))
  inject('rights', generateRights(context))
}
