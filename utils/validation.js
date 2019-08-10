import { VALIDATION_TRIGGER } from '@/utils/constants'

const generateValidationFunction = (context, key, validate) => (_rule, value, cb) => {
  if (validate && !value) {
    cb(new Error(context.$t(`forms.common.validation.${key}`)));
  }
  cb();
};

export const generateValidator = (context, key, validate = true, required = true) => ({
  validator: generateValidationFunction(context, key, validate),
  trigger: VALIDATION_TRIGGER,
  required
});
