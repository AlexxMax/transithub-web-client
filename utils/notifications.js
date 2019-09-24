import Vue from 'vue'
import { Notification } from 'element-ui'
import config from '@/config'

const notify = (type, message, title) => Notification({
  message,
  title: title || Vue.prototype.$nuxt.$t(`messages.${type}`),
  type,
  showClose: true,
  duration: config.ui.messages.duration,
  zIndex: 9000
})

export const success = (...args) => notify('success', ...args)
export const warning = (...args) => notify('warning', ...args)
export const error = (...args) => notify('error', ...args)
export const info = (...args) => notify('info', ...args)
