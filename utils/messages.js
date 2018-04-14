import { Message } from 'element-ui';

export const TYPE_SUCCESS = 'success'
export const TYPE_WARNING = 'warning'
export const TYPE_MESSAGE = 'message'
export const TYPE_ERROR   = 'error'

export const show = (message, type) => {
  Message({
    showClose: true,
    message,
    type
  });
}
