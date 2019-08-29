import * as notify from '@/utils/notifications'
import { VALIDATION_TRIGGER } from '@/utils/constants'

const generateValidationFunction = (context, key, validate) => (_rule, value, cb) => {
  if (validate && !value) {
    cb(new Error(context.$t(`forms.common.validation.${key}`)));
  }
  cb();
};

export const generateValidator = (context = Vue.prototype.$nuxt, key, validate = true, required = true) => ({
  validator: generateValidationFunction(context, key, validate),
  trigger: VALIDATION_TRIGGER,
  required
});

export const showNotifications = (fields) => {
  Object.keys(fields).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const errors = fields[key]
      errors.forEach((error) => {
        if (error.message) {
          notify.error(error.message)
        }
      })
    }
  })
}
