import {
  Notification
} from 'element-ui';

export const TYPE_SUCCESS = 'success'
export const TYPE_WARNING = 'warning'
export const TYPE_INFO = 'info'
export const TYPE_ERROR = 'error'

export const show = (title, message, type) => {
  Notification({
    showClose: true,
    duration: 0,
    message,
    title,
    type: type || TYPE_SUCCESS
  });
}
