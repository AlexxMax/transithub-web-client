<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="closeWithoutChanges"
  >
    <div class="DriverEditForm">
      <el-form
        ref="form"
        :model="driver"
        label-position="top"
        label-width="100px"
        size="mini"
        :validate-on-rule-change="false"
        :rules="currentRules"
      >
        <el-row :gutter="20">
          <el-col :xs="24" :md="14">
            <div>
              <el-form-item :label="$t('forms.common.lastName')" prop="lastName">
                <el-input
                  v-model="driver.lastName"
                  :placeholder="$t('forms.common.lastNamePlaceholder')"
                  clearable
                />
              </el-form-item>

              <el-form-item :label="$t('forms.common.firstName')" prop="firstName">
                <el-input
                  v-model="driver.firstName"
                  :placeholder="$t('forms.common.firstNamePlaceholder')"
                  clearable
                />
              </el-form-item>

              <el-form-item :label="$t('forms.common.middleName')" prop="middleName">
                <el-input
                  v-model="driver.middleName"
                  :placeholder="$t('forms.common.middleNamePlaceholder')"
                  clearable
                />
              </el-form-item>

              <div style="margin-top: 30px; margin-bottom: 10px">
                <el-radio-group
                  v-model="driver.personDocsType"
                  size="small"
                >
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
                <div class="DriverEditForm__input-complex">
                  <el-form-item class="DriverEditForm__input-complex--2chars" prop="passSerial">
                    <el-input
                      v-model="driver.passSerial"
                      :placeholder="$t('forms.common.passSerialPlaceholder')"
                      :maxlength="2"
                      @input="handlePassSerialInput"
                    />
                  </el-form-item>

                  <el-form-item class="DriverEditForm__input-complex--6chars" prop="passNumber">
                    <el-input
                      v-mask="'######'"
                      v-model="driver.passNumber"
                      :placeholder="$t('forms.common.passNumberPlaceholder')"
                      :maxlength="6"
                    />
                  </el-form-item>

                  <el-form-item class="DriverEditForm__input-complex--10chars" prop="passDate">
                    <el-date-picker
                      v-model="driver.passDate"
                      type="date"
                      :placeholder="$t('forms.common.passDatePlaceholder')"
                      format="dd.MM.yyyy"
                      :clearable="false"
                      :picker-options="datePickerOptions"
                      style="width: 126px;"
                    />
                  </el-form-item>
                </div>

                <el-form-item class="DriverEditForm__input-complex--bottom" prop="passIssued">
                  <el-input
                    v-model="driver.passIssued"
                    :placeholder="$t('forms.common.passIssuedPlaceholder')"
                    clearable
                  />
                </el-form-item>
              </el-form-item>

              <el-form-item v-show="driver.personDocsType === PERSON_DOCS_TYPE.ID_CARD">
                <div class="DriverEditForm__input-complex">
                  <el-form-item
                    class="DriverEditForm__input-id_card"
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

                  <el-form-item class="DriverEditForm__input-complex--10chars" prop="idCardDate">
                    <el-date-picker
                      v-model="driver.idCardDate"
                      type="date"
                      :placeholder="$t('forms.common.passDatePlaceholder')"
                      format="dd.MM.yyyy"
                      :clearable="false"
                      :picker-options="datePickerOptions"
                      style="width: 126px;"
                    />
                  </el-form-item>
                </div>

                <el-form-item class="DriverEditForm__input-complex--bottom" prop="idCardIssued">
                  <el-input
                    v-model="driver.idCardIssued"
                    :placeholder="$t('forms.common.passIssuedPlaceholder')"
                    clearable
                  />
                </el-form-item>

              </el-form-item>

              <el-form-item
                :label="$t('forms.common.certSerialNumber')"
                prop="certSerialNumber"
              >
                <!-- <Tooltip
                  :content="$t('forms.common.certSerialNumberTooltip')"
                  placement="bottom"
                >
                </Tooltip> -->
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
                    clearable
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

                <div v-else class="DriverEditForm__contact-info-additional-div"/>
              </div>

              <div v-if="showAdditionalPhone1" class="DriverEditForm__contact-info">
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
                    clearable
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

              <div v-if="showAdditionalPhone2" class="DriverEditForm__contact-info">
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
                    clearable
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
                    clearable
                  >
                    <fa slot="prefix" class="DriverEditForm__contact-info__icon" icon="at"/>
                  </el-input>
                </el-form-item>

                <div class="DriverEditForm__contact-info-additional-div"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div class="DriverEditForm__footer">
        <!-- IT WAS BEFORE -->
        <!-- <Button round type="primary" :loading="loading" @click="submit">{{ mainBtnLabel }}</Button> -->

        <Button round type="primary" :loading="loading" @click="submit">{{ mainBtnLabel }}</Button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from "@/components/Common/Buttons/Button";
import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES,
  PERSON_DOCS_TYPE
} from '@/utils/drivers'
import {
  VALIDATION_TRIGGER,
  PHONE_MASK } from '@/utils/constants'
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
    email: null,
    idCard: '',
    idCardDate: new Date(),
    idCardIssued: null,
    personDocsType: PERSON_DOCS_TYPE.PASSPORT
  }
}
export default {
  name: 'th-driver-edit-dialog',
  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { Button },

  data() {
    const validation = {
      driverLicenseMask: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.certSerialNumber")));
        } else if (value && value.length < 9) {
          cb(new Error(this.$t("forms.common.validation.fieldLengthLessNine")));
        }
        cb();
      },
      phone: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.phone")));
        } else if (value && !value.pValidPhone()) {
          cb(new Error(this.$t("forms.user.validation.incorrectPhone")));
        }
        cb();
      }
      // passSerial: (rule, value, cb) => {
      //   if (value.length < 2) {
      //     cb(new Error(this.$t('forms.common.validation.fieldLengthLessTwo')))
      //   }
      //   cb()
      // },
      // passNumber: (rule, value, cb) => {
      //   if (value.length < 6) {
      //     cb(new Error(this.$t('forms.common.validation.fieldLengthLessSix')))
      //   }
      //   cb()
      // }
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
    const phoneValidationRules = validate => [
      {
        ...generateValidator("phone", validate),
        max: 13
      },
      {
        type: "string",
        validator: (rule, value, cb) => {
          if (validate && !value.pValidPhone()) {
            cb(new Error(this.$t("forms.user.validation.incorrectPhone")));
          }
          cb();
        },
        trigger: ["blur", "change"]
      }
    ];

    const data = {
      driver: getBlankDriver(this.$store),
      rules: {
        firstName: [{
          ...generateValidator('firstName'),
          required: true
        }],
        middleName: [{
          ...generateValidator('middleName'),
          required: true
        }],
        lastName: [{
          ...generateValidator('lastName'),
          required: true
        }],
        passSerial: [{
          ...generateValidator('passSerial'),
          //validator: validation.passSerial,
        }],
        passNumber: [{
          ...generateValidator('passNumber'),
          //validator: validation.passNumber,
        }],
        passDate: [{
          ...generateValidator('passDate')
        }],
        passIssued: [{
          ...generateValidator('passIssued')
        }],
        idCard: [{
          ...generateValidator('idCard')
        }],
        idCardDate: [{
          ...generateValidator('idCardDate')
        }],
        idCardIssued: [{
          ...generateValidator('idCardIssued')
        }],
        certSerialNumber: [{
         // ...generateValidator('certSerialNumber'),
          validator: validation.driverLicenseMask,
          required: true,
        }],
        phone: [{
          //...phoneValidationRules(true),
          validator: validation.phone,
          //...generateValidator('phone'),
          required: true
        }],
        phone1: [{
          //phoneValidationRules(this.showAdditionalPhone1)
          validator: validation.phone,
        }],
        //phone2: phoneValidationRules(this.showAdditionalPhone2),
        phone2: [
          {
            //phoneValidationRules(this.showAdditionalPhone1)
            validator: validation.phone
          }
        ],
        email: [
          {
            // ...generateValidator('email'),
            max: 500
          },
          {
            type: "email",
            message: this.$t("forms.user.validation.incorrectEmail"),
            trigger: ["blur", "change"]
          }
        ]
      },
      showAdditionalPhone1: false,
      showAdditionalPhone2: false,
      phoneMask: PHONE_MASK,
      //driverLicenseMask: DRIVER_LICENSE_MASK,
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },

      PERSON_DOCS_TYPE
    }

    data.showAdditionalPhone1 = Boolean(data.driver.phone1);
    data.showAdditionalPhone2 = Boolean(data.driver.phone2);

    return data;
  },
  computed: {
    dialogVisible: {
      get() {
        return this.$store.state.drivers.editing.showEditDialog;
      },
      set(value) {
        this.$store.commit(
          `${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`,
          value
        );
      }
    },
    title() {
      return this.driver.guid
        ? this.$t("forms.driver.editDriverDialog")
        : this.$t("forms.driver.createDriverDialog");
    },
    mainBtnLabel() {
      if (this.driver.guid) {
        return this.$t("forms.common.save");
      }
      return this.$t("forms.common.create");
    },
    loading() {
      return this.$store.state.drivers.loading;
    },
    showAddAdditionPhoneBtn() {
      return !this.showAdditionalPhone1 || !this.showAdditionalPhone2
    },
    currentRules() {
      const rules = { ...this.rules }

      if (this.driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT) {
        rules.idCard = null
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
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.driver.guid) {
            this.changeDriver();
          } else {
            this.createDriver();
          }
        } else {
          return false;
        }
      });
    },
    async createDriver() {
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`,
        {
          companyGuid: this.$store.state.companies.currentCompany.guid,
          payload: this.driver
        }
      );
      if (errorKey) {
        showErrorMessage(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false;
      }
    },
    async changeDriver() {
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`,
        {
          companyGuid: this.$store.state.companies.currentCompany.guid,
          driverGuid: this.driver.guid,
          payload: this.driver
        }
      );
      if (errorKey) {
        showErrorMessage(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false;
      }
    },
    handleAddAdditionalPhone() {
      if (!this.showAdditionalPhone1) {
        this.showAdditionalPhone1 = true;
        return;
      }
      if (!this.showAdditionalPhone2) {
        this.showAdditionalPhone2 = true;
      }
    },
    handleRemoveAdditionalPhone(additionalPhoneId) {
      this.driver[`phone${additionalPhoneId}`] = null;
      this[`showAdditionalPhone${additionalPhoneId}`] = false;
    },
    handlePhoneDelete(phone) {
      if (phone.length < 4) {
        e.preventDefault();
      }
    },
    clearValidate() {
      if (this.$refs["form"]) {
        this.$refs["form"].clearValidate()
      }
    },
    reset() {
      this.driver = getBlankDriver(this.$store)
      this.showAdditionalPhone1 = Boolean(this.driver.phone1)
      this.showAdditionalPhone2 = Boolean(this.driver.phone2)
      this.clearValidate()
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
    closeWithoutChanges() {
      this.$confirm(this.$t("forms.common.closeWindowWithoutChanges"), {
        confirmButtonText: this.$t("forms.common.close"),
        cancelButtonText: this.$t("forms.common.discard"),
        type: "warning",
        roundButton: true,
        zIndex: 4001
      }).then(() => {
        this.dialogVisible = false
      });
    }
  },

  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.reset();
      }
    }
  }
};
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
    &-id_card {
      width: 120px;
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
      }
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
