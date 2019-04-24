<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="dialogVisible = false"
  >

    <div class="DriverEditForm">

      <el-form
        ref="form"
        :model="driver"
        label-position="top"
        label-width="100px"
        size="mini"
        :rules="rules"
      >

        <el-row :gutter="20">
          <el-col :xs="24" :md="14">
            <div>
              <el-form-item
                :label="$t('forms.common.lastName')"
                prop="lastName"
              >
                <el-input v-model="driver.lastName" :placeholder="$t('forms.common.lastNamePlaceholder')" clearable/>
              </el-form-item>

              <el-form-item
                :label="$t('forms.common.firstName')"
                prop="firstName"
              >
                <el-input v-model="driver.firstName" :placeholder="$t('forms.common.firstNamePlaceholder')" clearable/>
              </el-form-item>

              <el-form-item
                :label="$t('forms.common.middleName')"
                prop="middleName"
              >
                <el-input v-model="driver.middleName" :placeholder="$t('forms.common.middleNamePlaceholder')" clearable/>
              </el-form-item>

              <el-form-item
                :label="$t('forms.common.passportData')"
              >
                <div class="DriverEditForm__input-complex">
                  <el-form-item
                    class="DriverEditForm__input-complex--2chars"
                    prop="passSerial"
                  >
                    <el-input
                      v-model="driver.passSerial"
                      :placeholder="$t('forms.common.passSerialPlaceholder')"
                      :maxlength="2"
                      @input="handlePassSerialInput"
                    />
                  </el-form-item>

                  <el-form-item
                    class="DriverEditForm__input-complex--6chars"
                    prop="passNumber"
                  >
                    <el-input
                      v-mask="'######'"
                      v-model="driver.passNumber"
                      :placeholder="$t('forms.common.passNumberPlaceholder')"
                      :maxlength="6"
                    />
                  </el-form-item>

                  <el-form-item
                    class="DriverEditForm__input-complex--10chars"
                    prop="passDate"
                  >
                    <el-date-picker
                      v-model="driver.passDate"
                      type="date"
                      :placeholder="$t('forms.common.passDatePlaceholder')"
                      format="dd.MM.yyyy"
                      :clearable="false"
                      style="width: 126px;"
                    />
                  </el-form-item>
                </div>

                <el-form-item
                  class="DriverEditForm__input-complex--bottom"
                  prop="passIssued"
                >
                    <el-input v-model="driver.passIssued" :placeholder="$t('forms.common.passIssuedPlaceholder')" clearable/>
                </el-form-item>
              </el-form-item>

              <el-form-item
                :label="$t('forms.common.certSerialNumber')"
                prop="certSerialNumber"
              >
                <el-input
                  v-model="driver.certSerialNumber"
                  :placeholder="$t('forms.common.certSerialNumberPlaceholder')"
                  :maxlength="9"
                  clearable
                />
              </el-form-item>
            </div>
          </el-col>

          <el-col :xs="24" :md="10">
            <div>
              <div class="DriverEditForm__contact-info">
                <el-form-item
                  class="DriverEditForm__input-fullwidth"
                  :label="$t('forms.common.phone')"
                  prop="phone"
                >
                  <el-input
                    v-model="driver.phone"
                    v-mask="phoneMask"
                    type="phone"
                    :placeholder="$t('forms.common.phonePlaceholder')"
                    @keydown.delete.native="handlePhoneDelete"
                  >
                    <fa slot="prefix" class="DriverEditForm__contact-info__icon" icon="phone"/>
                  </el-input>
                </el-form-item>

                <Button
                  v-if="showAddAdditionPhoneBtn"
                  class="DriverEditForm__contact-info-additional-btn"
                  icon-only
                  fa-icon="plus"
                  @click="handleAddAdditionalPhone"
                />

                <div
                  v-else
                  class="DriverEditForm__contact-info-additional-div"
                />
              </div>

              <div
                v-if="showAdditionalPhone1"
                class="DriverEditForm__contact-info"
              >
                <el-form-item
                  class="DriverEditForm__input-fullwidth"
                  :label="$t('forms.common.additionalPhone')"
                  prop="phone1"
                >
                  <el-input
                    v-model="driver.phone1"
                    v-mask="phoneMask"
                    type="phone"
                    :placeholder="$t('forms.common.phonePlaceholder')"
                    @keydown.delete.native="handlePhoneDelete"
                  >
                    <fa slot="prefix" class="DriverEditForm__contact-info__icon" icon="phone"/>
                  </el-input>
                </el-form-item>

                <Button
                  class="DriverEditForm__contact-info-additional-btn"
                  danger
                  icon-only
                  fa-icon="times"
                  @click="handleRemoveAdditionalPhone(1)"
                />
              </div>

              <div
                v-if="showAdditionalPhone2"
                class="DriverEditForm__contact-info"
              >
                <el-form-item
                  class="DriverEditForm__input-fullwidth"
                  :label="$t('forms.common.additionalPhone')"
                  prop="phone2"
                >
                  <el-input
                    v-model="driver.phone2"
                    v-mask="phoneMask"
                    type="phone"
                    :placeholder="$t('forms.common.phonePlaceholder')"
                    @keydown.delete.native="handlePhoneDelete"
                  >
                    <fa slot="prefix" class="DriverEditForm__contact-info__icon" icon="phone"/>
                  </el-input>
                </el-form-item>

                <Button
                  class="DriverEditForm__contact-info-additional-btn"
                  danger
                  icon-only
                  fa-icon="times"
                  @click="handleRemoveAdditionalPhone(2)"
                />
              </div>

              <div class="DriverEditForm__contact-info">
                <el-form-item
                  class="DriverEditForm__input-fullwidth"
                  :label="$t('forms.common.email')"
                  prop="email"
                >
                  <el-input
                    v-model="driver.email"
                    type="email"
                    :maxlength="200"
                    :placeholder="$t('forms.common.emailPlaceholder')"
                  >
                    <fa slot="prefix" class="DriverEditForm__contact-info__icon" icon="at"/>
                  </el-input>
                </el-form-item>

                <div class="DriverEditForm__contact-info-additional-div"
                />
              </div>
            </div>
          </el-col>
        </el-row>

      </el-form>

      <div class="DriverEditForm__footer">
        <Button
          round
          type="primary"
          :loading="loading"
          @click="submit"
        >
          {{ mainBtnLabel }}
        </Button>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from '@/utils/drivers'
import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'
import { showErrorMessage } from '@/utils/messages'
import { getErrorMessage } from '@/utils/errors'

const getBlankDriver = store => {
  const creation = store.state.drivers.editing.type === EDIT_DIALOG_TYPES.CREATE
  const driverStoreItem = { ...store.state.drivers.item }
  return driverStoreItem.guid && !creation ?
    {
      ...driverStoreItem,
      passDate: (driverStoreItem.passDate || '').pToDate()
    } : {
    firstName: null,
    middleName: null,
    lastName: null,
    passSerial: null,
    passNumber: null,
    passDate: new Date(),
    passIssued: null,
    certSerialNumber: null,
    phone: '',
    phone1: '',
    phone2: '',
    email: null
  }
}

export default {
  name: 'th-driver-edit-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { Button },

  data() {
    const generateValidationFunction = (key, validate) => ((rule, value, cb) => {
      if (validate && !value) {
        cb(new Error(this.$t(`forms.common.validation.${key}`)))
      }
      cb()
    })

    const generateValidator = (key, validate = true) => ({
      validator: generateValidationFunction(key, validate),
      trigger: VALIDATION_TRIGGER
    })

    const phoneValidationRules = validate => ([{
      ...generateValidator('phone', validate),
      max: 13
    }, {
      type: 'string',
      validator: (rule, value, cb) => {
        if (validate && !value.pValidPhone()) {
          cb(new Error(this.$t('forms.user.validation.incorrectPhone')))
        }
        cb()
      },
      trigger: ['blur', 'change']
    }])

    return {
      driver: getBlankDriver(this.$store),

      rules: {
        firstName: [generateValidator('firstName')],
        middleName: [generateValidator('middleName')],
        lastName: [generateValidator('lastName')],
        passSerial: [generateValidator('passSerial')],
        passNumber: [generateValidator('passNumber')],
        passDate: [generateValidator('passDate')],
        passIssued: [generateValidator('passIssued')],
        certSerialNumber: [generateValidator('certSerialNumber')],
        phone: phoneValidationRules(true),
        phone1: phoneValidationRules(this.showAdditionalPhone1),
        phone2: phoneValidationRules(this.showAdditionalPhone2),
        email: [{
          ...generateValidator('email'),
          max: 500
        }, {
          type: 'email',
          message: this.$t('forms.user.validation.incorrectEmail'),
          trigger: ['blur', 'change']
        }]
      },

      showAdditionalPhone1: false,
      showAdditionalPhone2: false,

      phoneMask: PHONE_MASK
    }
  },

  computed: {
    dialogVisible: {
      get() {
        return this.$store.state.drivers.editing.showEditDialog
      },
      set(value) {
        this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, value)
      }
    },

    title() {
      return this.driver.guid
        ? this.$t('forms.driver.editDriverDialog')
        : this.$t('forms.driver.createDriverDialog')
    },

    mainBtnLabel() {
      if (this.driver.guid) {
        return this.$t('forms.common.save')
      }
      return this.$t('forms.common.create')
    },

    loading() {
      return this.$store.state.drivers.loading
    },

    showAddAdditionPhoneBtn() {
      return !this.showAdditionalPhone1 || !this.showAdditionalPhone2
    }
  },

  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.driver.guid) {
            this.changeDriver()
          } else {
            this.createDriver()
          }
        } else {
          return false
        }
      })
    },

    async createDriver() {
      const errorKey = await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`, {
        companyGuid: this.$store.state.companies.currentCompany.guid,
        payload: this.driver
      })

      if (errorKey) {
        showErrorMessage(getErrorMessage(this, errorKey))
      } else {
        this.dialogVisible = false
      }
    },

    async changeDriver() {
      const errorKey = await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`, {
        companyGuid: this.$store.state.companies.currentCompany.guid,
        driverGuid: this.driver.guid,
        payload: this.driver
      })

      if (errorKey) {
        showErrorMessage(getErrorMessage(this, errorKey))
      } else {
        this.dialogVisible = false
      }
    },

    handleAddAdditionalPhone() {
      if (!this.showAdditionalPhone1) {
        this.showAdditionalPhone1 = true
        return
      }

      if (!this.showAdditionalPhone2) {
        this.showAdditionalPhone2 = true
      }
    },

    handleRemoveAdditionalPhone(additionalPhoneId) {
      this.driver[`phone${additionalPhoneId}`] = null
      this[`showAdditionalPhone${additionalPhoneId}`] = false
    },

    handlePhoneDelete(phone) {
      if (phone.length < 4) {
        e.preventDefault()
      }
    },

    reset() {
      if (this.$refs['form']) {
        this.$refs['form'].clearValidate()
      }
      this.driver = getBlankDriver(this.$store)
      this.showAdditionalPhone1 = false
      this.showAdditionalPhone2 = false
    },

    handlePassSerialInput() {
      if (!this.driver.passSerial) {
        return
      }

      const regex = /[a-zA-Zа-яА-Я]/gmu
      const lastChar = this.driver.passSerial[this.driver.passSerial.length - 1]
      if (!regex.test(lastChar)) {
        this.driver.passSerial = this.driver.passSerial.substr(0, this.driver.passSerial.length - 1)
      } else {
        this.driver.passSerial = this.driver.passSerial.toUpperCase()
      }
    }
  },

  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.reset()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.DriverEditForm {

  &__input {
    &-fullwidth {
      width: 100% !important;
    }

    &-complex {
      display: flex;
      flex-direction: row;
      margin-bottom: -18px;

      *:not(:first-child) {
        margin-left: 20px;
      }

      &--2chars {
        width: 56px;
      }

      &--6chars {
        width: 78px;
      }

      &--10chars {
        flex-grow: 5;
      }

      &--bottom {
        margin-top: 15px;
        margin-bottom: 0 !important;
      }
    }
  }

  &__contact-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &-additional {
      &-btn {
        margin-top: 19px;
        font-size: 20px;
        padding: 0 0 0 10px;
      }

      &-div {
        width: 29px;
      }
    }

    &__icon {
      margin-left: 5px;
    }
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    *:first-child {
      padding: {
        left: 40px;
        right: 40px;
      };
    }
  }
}

@media only screen and (max-width: 991px) {
  .DriverEditForm {
    &__contact-info {
      &-additional {
        &-div {
          width: 0;
        }
      }
    }
  }
}
</style>
