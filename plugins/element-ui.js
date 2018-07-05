import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import '@/assets/styles/element-variables.scss'
// import locale from 'element-ui/lib/locale/lang/ua'

export default () => {
  Vue.use(Element, { locale })
}
