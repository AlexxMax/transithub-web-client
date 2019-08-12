import Vue from 'vue'
import { MessageBox } from 'element-ui'
import config from '@/config'

const confirm = (type, message, title) => {

  title = title || Vue.prototype.$nuxt.$t(`messages.${type}`)
  return MessageBox.confirm(message, title, { type })

}

export const success = (...args) => confirm('success', ...args)
export const warning = (...args) => confirm('warning', ...args)
export const error = (...args) => confirm('error', ...args)
export const info = (...args) => confirm('info', ...args)