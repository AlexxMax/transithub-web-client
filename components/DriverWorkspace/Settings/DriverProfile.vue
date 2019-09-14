<template>
  <div class="DriverProfile">

    <div class="DriverProfile__header-wrapper">
      <div class="DriverProfile__header-wrapper__content">

        <div
          class="DriverProfile__header-wrapper__content__header"
        >
          <ButtonBack
            id="left-position"
            style="margin-bottom: 0;"
            :before-click="handleBeforeClose"
            :to="$i18n.path('driver/settings')"
          />

          <span class="DriverProfile__header-wrapper__content__header-title">
            {{ $t('forms.driverWorkspace.driverInfo') }}
          </span>
        </div>
      </div>
    </div>

    <div class="DriverProfile__body-wrapper">
      <el-form
        v-loading="loading"
        :model="driver"
        ref="formMain"
        label-width="120px"
        label-position="top"
        :rules="currentRules"
      >
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

        <div style="margin-top: 30px; margin-bottom: 10px">
          <el-radio-group v-model="driver.personDocsType">

            <el-radio-button :label="PERSON_DOCS_TYPE.PASSPORT">
              {{ $t('forms.common.passportData') }}
            </el-radio-button>

            <el-radio-button :label="PERSON_DOCS_TYPE.ID_CARD">
              {{ $t('forms.common.idCard') }}
            </el-radio-button>
          </el-radio-group>
        </div>

        <el-form-item
          v-show="driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT"

        >
          <div class="DriverProfile__body-wrapper__input-complex">
            <el-form-item
              class="DriverProfile__body-wrapper__input-complex--2chars"
              :label="$t('forms.common.validation.passSerial')"
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
              class="DriverProfile__body-wrapper__input-complex--6chars"
              :label="$t('forms.common.validation.passNumber')"
              prop="passNumber"
            >
              <el-input
                v-mask="'######'"
                v-model="driver.passNumber"
                :placeholder="$t('forms.common.passNumberPlaceholder')"
                :maxlength="6"
              />
            </el-form-item>
          </div>

          <el-form-item
            class="DriverProfile__body-wrapper__input-complex--10chars"
            :label="$t('forms.common.passDate')"
            prop="passDate"
          >
            <el-date-picker
              v-model="driver.passDate"
              type="date"
              :placeholder="$t('forms.common.passDatePlaceholder')"
              format="dd.MM.yyyy"
              :clearable="false"
              :picker-options="datePickerOptions"
              style="width: 100%;"
            />
          </el-form-item>

          <el-form-item
            class="DriverProfile__body-wrapper__input-complex--bottom"
            :label="$t('forms.common.passIssued')"
            prop="passIssued"
          >
            <el-input
              v-model="driver.passIssued"
              :placeholder="$t('forms.common.passIssuedPlaceholder')"
              clearable
            />
          </el-form-item>
        </el-form-item>

        <el-form-item v-show="driver.personDocsType === PERSON_DOCS_TYPE.ID_CARD">
          <el-form-item
            class="DriverProfile__body-wrapper__input-id_card"
            :label="$t('forms.common.validation.passNumber')"
            prop="idCard"
          >
            <el-input
              v-mask="'#########'"
              v-model="driver.idCard"
              :placeholder="$t('forms.common.idCardPlaceholder')"
              :maxlength="9"
              clearable
            />
          </el-form-item>

          <el-form-item
            class="DriverProfile__body-wrapper__input-complex--10chars"
            :label="$t('forms.common.idCardDate')"
            prop="idCardDate"
          >
            <el-date-picker
              v-model="driver.idCardDate"
              type="date"
              :placeholder="$t('forms.common.passDatePlaceholder')"
              format="dd.MM.yyyy"
              :clearable="false"
              :picker-options="datePickerOptions"
              style="width: 100%;"
            />
          </el-form-item>

          <el-form-item
            class="DriverProfile__body-wrapper__input-complex--bottom"
            :label="$t('forms.common.passIssued')"
            prop="idCardIssued"
          >
            <el-input
              v-model="driver.idCardIssued"
              :placeholder="$t('forms.common.passIssuedPlaceholder')"
              clearable
            />
          </el-form-item>

        </el-form-item>

        <div class="DriverEditForm__footer">
          <Button
            round
            style="width: 100%; margin-top: 15px"
            size="default"
            type="primary"
            :loading="loading"
            @click="submit"
          >
            {{ $t('forms.common.save') }}
          </Button>
        </div>

      </el-form>

    </div>
  </div>
</template>

<script>

import ButtonBack from '@/components/Common/FormElements/Constituents/ButtonBack'
import Button from "@/components/Common/Buttons/Button"

import { VALIDATION_TRIGGER } from '@/utils/constants'
import closeDialog from '@/mixins/closeDialog'
import * as notify from '@/utils/notifications'

import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  PERSON_DOCS_TYPE
} from '@/utils/driver'

const getBlankDriver = store => {
  const driverStoreItem = { ...store.state.driver }
  return driverStoreItem.guid ?
   {
      ...driverStoreItem,
      passDate: (driverStoreItem.passDate || '').pToDate(),
      idCardDate: (driverStoreItem.idCardDate || '').pToDate()
    } : {
    passSerial: '',
    passNumber: '',
    passDate: new Date(),
    passIssued: '',
    certSerialNumber: '',
    idCard: '',
    idCardDate: new Date(),
    idCardIssued: '',
    personDocsType: PERSON_DOCS_TYPE.PASSPORT
  }
}

export default {
  name: "th-drivers-profile",

  mixins: [closeDialog('driver')],

  components: {
    ButtonBack,
    Button
  },

  data() {
    const validation = {
      driverLicenseMask: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.certSerialNumber")));
        } else if (value && value.length < 9) {
          cb(new Error(this.$t("forms.common.validation.fieldLengthLessNine")));
        }
        cb();
      }
    };

    const generateValidationFunction = (key, validate) => (rule, value, cb) => {
      if (validate && !value) {
        cb(new Error(this.$t(`forms.common.validation.${key}`)));
      }
      cb();
    };

    const generateValidator = (key, validate = true) => ({
      validator: generateValidationFunction(key, validate),
      trigger: VALIDATION_TRIGGER
    });

    const data = {
      driver: getBlankDriver(this.$store),

      rules: {
        certSerialNumber: [{
          validator: validation.driverLicenseMask,
          required: true,
        }],

        passSerial: [{
          ...generateValidator('enterPassSerial'),
          required: true
        }],

        passNumber: [{
          ...generateValidator('enterPassNumber'),
          required: true
        }],

        passDate: [{
          ...generateValidator('enterPassDate'),
          required: true
        }],

        passIssued: [{
          ...generateValidator('passIssued'),
          required: true
        }],

        idCard: [{
          ...generateValidator('enterPassNumber'),
          required: true
        }],

        idCardDate: [{
          ...generateValidator('idCardDate'),
          required: true
        }],

        idCardIssued: [{
          ...generateValidator('idCardIssued'),
          required: true
        }]
      },

      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },

      loadingChange: false,

      PERSON_DOCS_TYPE
    }

    return data
  },

  computed: {
    loading() {
      return this.$store.state.driver.loading || this.loadingChange
    },

    currentRules() {
      const rules = { ...this.rules }

      if (this.driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT) {
        rules.idCard = null
        rules.idCardDate = null
        rules.idCardIssued = null
      } else if (this.driver.personDocsType === PERSON_DOCS_TYPE.ID_CARD) {
        rules.passSerial = null
        rules.passNumber = null
        rules.passDate = null
        rules.passIssued = null
      }

      return rules
    }
  },

  methods: {
    submit() {
      this.$refs["formMain"].validate(valid => {
        if (valid) {
          if (this.driver.guid) {
            this.changeDriver()
          }
        } else {
          return false;
        }
      })
    },

    validate(done) {
      this.$refs.formMain.validate(valid => {
        if (valid) {
          done(true);
        } else {
          done(false);
        }
      })
    },

    handlePassSerialInput() {
      if (!this.driver.passSerial) {
        return;
      }
      const regex = /[a-zA-Zа-яА-Я]/gmu;
      const lastChar = this.driver.passSerial[
        this.driver.passSerial.length - 1
      ];
      if (!regex.test(lastChar)) {
        this.driver.passSerial = this.driver.passSerial.substr(
          0,
          this.driver.passSerial.length - 1
        );
      } else {
        this.driver.passSerial = this.driver.passSerial.toUpperCase();
      }
    },

    generatePayload() {
      const {
        passSerial,
        passNumber,
        passDate,
        passIssued,
        idCard,
        idCardDate,
        idCardIssued,
        ...driverData
      } = this.driver
      let payload = { ...driverData }
      const type = this.driver.personDocsType
      if (type === PERSON_DOCS_TYPE.PASSPORT) {
        payload = {
          ...payload,
          passSerial,
          passNumber,
          passDate,
          passIssued
        }
      } else if (type === PERSON_DOCS_TYPE.ID_CARD) {
        payload = {
          ...payload,
          passNumber: idCard,
          passDate: idCardDate,
          passIssued: idCardIssued
        }
      }

      return payload
    },

    async changeDriver() {
      this.loadingChange = true

      try {

        const errorKey = await this.$methods.driver.changeDriver(this.generatePayload())

        if (errorKey)
          notify.error(getErrorMessage(this, errorKey))
        else {
          notify.success(this.$t('forms.user.messages.saveMainSuccess'))

          this.$router.push(this.$i18n.path('driver/settings'))
        }

      } catch ({ message }) { notify.error(message) }

      this.loadingChange = false
    },

    handleBeforeClose(cb) {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => cb(false))
    },
  }
}
</script>

<style lang="scss" scoped>
.DriverProfile {
  &__header-wrapper {
    border-top: 0;
    color: $--main-text-color;

    &__content {
      display: flex;
      flex-direction: column;
      padding: {
        top: $--driver-workspace-padding;
        right: $--driver-workspace-padding;
        bottom: 30px;
        left: $--driver-workspace-padding;
      }

      &__header {
        display: flex;
        flex-direction: row;

        #left-position {
          flex: 1;
        }

        &::after {
          content: '';
          flex: 1;
        }

        &-title {
          font-size: 13px;
          font-weight: bold;
        }
      }
    }
  }

  &__body-wrapper {
    display: flex;
    flex-direction: column;

    padding: {
      top: 0;
      right: $--driver-workspace-padding;
      bottom: $--driver-workspace-padding;
      left: $--driver-workspace-padding;
    }

    &__input {
      &-fullwidth {
        width: 100% !important;
      }

      &-complex {
        display: flex;
        flex-direction: row;

        *:not(:first-child) {
          margin-left: 20px;
        }

        &--2chars {
          flex: 1;
        }

        &--6chars {
          flex: 2;
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
  }
}

.el-form-item {
  margin-bottom: 20px !important;

  &:last-child {
    margin-bottom: 0px !important;
  }
}

.el-button {
  font-size: 16px !important;
}
</style>
