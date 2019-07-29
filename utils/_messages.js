import { Message } from 'element-ui'
import config from '@/config'

export const TYPE_SUCCESS = 'success'
export const TYPE_WARNING = 'warning'
export const TYPE_MESSAGE = 'message'
export const TYPE_ERROR   = 'error'

export const show = (message, type) => {
  const instance = Message({
    showClose: true,
    message,
    type,
    duration: config.ui.messages.duration
  });

  instance.$el.style.zIndex = instance.$el.style.zIndex + 3000
}

export const showSuccessMessage = message => {
  show(message, TYPE_SUCCESS)
}

export const showWarningMessage = message => {
  show(message, TYPE_WARNING)
}

export const showMessage = message => {
  show(message, TYPE_MESSAGE)
}

export const showErrorMessage = message => {
	console.error(message)
  show(message, TYPE_ERROR)
}
