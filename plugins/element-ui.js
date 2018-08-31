import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ua'
import '@/assets/styles/element-variables.scss'

export default () => {
  Vue.use(Element, { locale })
}
