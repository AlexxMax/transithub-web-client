<template>
  <el-dialog
    append-to-body
    :z-index="4000"
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="handleBeforeClose"
  >
    <div class="OrganisationEditForm">
      
      <div class="OrganisationEditForm__steps">
        <CommonSteps
          class="PQWarehousesEditDialog__steps"
          :active="activeStep"
          :steps="steps"
        />
      </div>

      <el-form
        ref="form"
        :model="organisation"
        label-position="top"
        label-width="100px"
        size="mini"
        :validate-on-rule-change="false"
        :rules="currentFormRules"
      >
        <div v-if="activeStep === STEPS.essential">
          <Fade>
            <div>
              <el-row :gutter="20">
                <el-col :span="24">
                  <OrganisationFormSelect
                    class="OrganisationEditForm__input-full-width"
                    no-init
                    label-prop="organisationFormGuid"
                    :value="organisation.organisationFormGuid"
                    @onSelect="handleOrganisationFormSelect"
                  />
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item :label="$t('forms.common.name')" prop="name">
                    <el-input
                      v-model="organisation.name"
                      :placeholder="$t('forms.company.profile.name')"
                      :maxlength="200"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- <div v-if="organisation.name && organisation.organisationFormGuid"> -->
              <el-row :gutter="20">
                <el-col :span="24">
                  <FormField
                    big-title
                    :title="$t('forms.company.profile.fullname')"
                    :value="organisation.fullname"
                  />
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <FormField
                    big-title
                    :title="$t('forms.company.profile.shortname')"
                    :value="organisation.shortname"
                  />
                </el-col>

                <el-col :xs="24" :md="12">
                  <FormField
                    big-title
                    :title="$t('forms.company.profile.workname')"
                    :value="organisation.workname"
                  />
                </el-col>
              </el-row>
              <!-- </div> -->
            </div>
          </Fade>
        </div>

        <div v-else-if="activeStep === STEPS.reqs">
          <Fade>
            <div>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="OrganisationEditForm__input__tax">
                    <TaxSchemesSelect
                      class="OrganisationEditForm__input__tax-first"
                      no-init
                      label-prop="taxSchemeGuid"
                      :value="organisation.taxSchemeGuid"
                      @onSelect="handleTaxSchemesSelect"
                    />
                    <div class="OrganisationEditForm__input__tax-second">{{ withNds }}</div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="5" v-if="!isFiz">
                  <el-form-item :label="$t('forms.company.profile.edrpou')" prop="edrpou">
                    <el-input
                      :value="organisation.edrpou"
                      :placeholder="$t('forms.company.profile.edrpou')"
                      :maxlength="8"
                      clearable
                      @input="value => handleNumericInput(value, 'edrpou')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="5">
                  <el-form-item :label="$t('forms.company.profile.inn')" prop="inn">
                    <el-input
                      :value="organisation.inn"
                      :placeholder="$t('forms.company.profile.inn')"
                      :maxlength="12"
                      clearable
                      @input="value => handleNumericInput(value, 'inn')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </Fade>
        </div>

        <div v-else-if="activeStep === STEPS.contacts">
          <Fade>
            <div>
              <el-row type="flex" align="middle" style="flex-direction: column;">
                <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item prop="webpage">
                    <el-input
                      v-model="organisation.webpage"
                      :placeholder="$t('forms.company.profile.webpage')"
                      :maxlength="50"
                      type="text"
                      clearable
                    >
                      <fa class="input-internal-icon" icon="globe" slot="prefix"/>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item prop="facebook">
                    <el-input
                      v-model="organisation.facebook"
                      :placeholder="$t('forms.company.profile.facebook')"
                      :maxlength="50"
                      type="text"
                      clearable
                    >
                      <fa
                        class="input-internal-icon"
                        :icon="['fab', 'facebook-square']"
                        slot="prefix"
                      />
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item prop="telegram">
                    <el-input
                      v-model="organisation.telegram"
                      :placeholder="$t('forms.company.profile.telegram')"
                      :maxlength="50"
                      type="text"
                      clearable
                    >
                      <span slot="prefix">
                        <fa class="input-internal-icon" :icon="['fab', 'telegram-plane']"/>
                      </span>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </Fade>
        </div>
      </el-form>

      <div class="OrganisationEditForm__footer">
        <Button
          type="text"
          @click="goToStep(-1)"
        >
          {{ $t('forms.common.back') }}
        </Button>

        <Button
          class="OrganisationEditForm__footer__next"
          round
          type="primary"
          :loading="loading"
          @click="goToStep(1)"
        >
          {{ mainBtnLabel }}
        </Button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from "@/components/Common/Buttons/Button";
import Fade from "@/components/Common/Transitions/Fade";
import CommonSteps from '@/components/Common/CommonSteps'
import OrganisationFormSelect from "@/components/OrganisationForms/SelectFormField";
import TaxSchemesSelect from "@/components/TaxSchemes/SelectFormField";
import FormField from "@/components/Common/FormElements/FormField";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES,
  EDIT_DIALOG_SOURCES
} from "@/utils/organisations";
import { VALIDATION_TRIGGER, PHONE_MASK } from "@/utils/constants";
import * as notify from '@/utils/notifications'
import { getErrorMessage } from "@/utils/errors";
import closeDialog from '@/mixins/closeDialog'

const getBlankOrganisation = store => {
  const creation =
    store.state.organisations.editing.type === EDIT_DIALOG_TYPES.CREATE;
  const organisationStoreItem = { ...store.state.organisations.item };
  return organisationStoreItem.guid && !creation
    ? { ...organisationStoreItem }
    : {
        name: '',
        fullname: '',
        shortname: '',
        workname: '',
        edrpou: '',
        inn: '',
        email: '',
        facebook: '',
        telegram: '',
        phone: "",
        webpage: '',
        organisationFormGuid: null,
        taxSchemeGuid: null
      };
};

const STEPS = {
  essential: 0,
  reqs: 1,
  contacts: 2
};

export default {
  name: "th-organisation-edit-dialog",

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), closeDialog('organisation') ],

  components: {
    Button,
    Fade,
    CommonSteps,
    OrganisationFormSelect,
    TaxSchemesSelect,
    FormField
  },

  data() {
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

    return {
      organisation: getBlankOrganisation(this.$store),

      rules: {
        stepEssential: {
          name: [generateValidator("name")],
          organisationFormGuid: [generateValidator("organisationForm")]
        },
        stepReqs: {
          taxSchemeGuid: [generateValidator("taxScheme")],
          edrpou: [generateValidator("edrpou")],
          inn: [generateValidator("inn")]
        },
        stepContacts: {}
      },

      activeStep: STEPS.essential,
      steps: [
        { icon: 'home', text: this.$t('forms.common.essential') },
        { icon: 'list-alt', text: this.$t('forms.common.requisites') },
        { icon: 'address-book', text: this.$t('forms.common.contacts') }
      ],
      STEPS,

      phoneMask: PHONE_MASK
    };
  },

  computed: {
    currentFormRules() {
      let rules = this.rules.stepEssential;
      if (this.activeStep === STEPS.reqs) {
        rules = this.rules.stepReqs;
      } else if (this.activeStep === STEPS.contacts) {
        rules = this.rules.stepContacts;
      }
      return rules;
    },

    dialogVisible: {
      get() {
        return this.$store.state[STORE_MODULE_NAME].editing.showEditDialog;
      },
      set(value) {
        this.$store.commit(
          `${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`,
          value
        );
      }
    },

    title() {
      return this.organisation.guid
        ? this.$t("forms.organisation.editOrganisationDialog")
        : this.$t("forms.organisation.createOrganisationDialog");
    },

    mainBtnLabel() {
      if (this.activeStep === STEPS.contacts) {
        if (this.organisation.guid) {
          return this.$t("forms.common.save");
        } else {
          return this.$t("forms.common.create");
        }
      }

      return this.$t("forms.common.next");
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading;
    },

    withNds() {
      const item = this.$store.state.taxSchemes.list.find(
        elem => elem.guid === this.organisation.taxSchemeGuid
      );
      if (!item) {
        return false;
      }
      return item.nds === 1
        ? this.$t("forms.common.hasPDV")
        : this.$t("forms.common.hasntPDV");
    },

    isFiz() {
      const item = this.$store.state.organisationForms.list.find(
        elem => elem.guid === this.organisation.organisationFormGuid
      );
      if (!item) {
        return false;
      }
      return (
        (item.type || "").toUpperCase().replace(" ", "") === "fiz".toUpperCase()
      );
    },

    subordinateListCompanyGuid() {
      return this.$store.state[STORE_MODULE_NAME].subordinateListCompanyGuid
    },

    source() {
      return this.$store.state[STORE_MODULE_NAME].editing.source
    }
  },

  methods: {
    show() {
      this.dialogVisible = true;
    },

    goToStep(step) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (step === -1 && this.activeStep === STEPS.essential) {
            return;
          } else if (this.activeStep === STEPS.contacts && step === 1) {
            if (this.organisation.guid) {
              this.changeOrganisation();
            } else {
              this.createOrganisation();
            }
          } else {
            this.activeStep = this.activeStep + step;
          }
        } else {
          return false;
        }
      });
    },

    async createOrganisation() {
      const companyGuid = this.source === EDIT_DIALOG_SOURCES.SUBORDINATE ? this.subordinateListCompanyGuid : this.$store.state.companies.currentCompany.guid
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`,
        {
          companyGuid,
          payload: this.organisation
        }
      );

      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        const m = this.$t('forms.company.messages.organisationCreated').replace('%1', this.organisation.name)
        notify.success(m)
        this.dialogVisible = false
      }
    },

    async changeOrganisation() {
      const companyGuid = this.source === EDIT_DIALOG_SOURCES.SUBORDINATE ? this.subordinateListCompanyGuid : this.$store.state.companies.currentCompany.guid
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`,
        {
          companyGuid,
          organisationGuid: this.organisation.guid,
          payload: this.organisation
        }
      );

      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false;
      }
    },

    reset() {
      if (this.$refs["form"]) {
        this.$refs["form"].clearValidate();
      }
      this.organisation = getBlankOrganisation(this.$store);
      this.activeStep = STEPS.essential;

      this.$_closeDialogMixin_reset()
    },

    handleOrganisationFormSelect(value) {
      this.organisation.organisationFormGuid = value;
      this.onNameChange();
    },

    onNameChange() {
      let { name, organisationFormGuid } = this.organisation;
      if (!name || !organisationFormGuid) {
        return;
      }
      name = name || "";
      const { nameUa: ofNameUa, abbrUa } = this.$store.getters[
        "organisationForms/getOrganisationForm"
      ](this.organisation.organisationFormGuid);
      this.organisation.fullname = `${ofNameUa} "${name}"`;
      this.organisation.shortname = `${abbrUa} "${name}"`;
      this.organisation.workname = `${name}, ${abbrUa}`;
    },

    handleTaxSchemesSelect(value) {
      this.organisation.taxSchemeGuid = value;
    },

    handleNumericInput(value, key) {
      this.organisation[key] = value.pGetOnlyNumbers();
    },
    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => {
        this.dialogVisible = false
      })
    }
  },

  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.reset();
      }
    },
    "organisation.name"() {
      this.onNameChange();
    }
  }
};
</script>

<style lang='scss' scoped>
.OrganisationEditForm {
  &__steps {
    margin: 0 auto 40px;

    .el-steps {
      background-color: white;
    }

    &__icon {
      font-size: 22px;
    }
  }

  &__input-full-width {
    width: 100%;
  }

  &__input__tax {
    display: flex;
    flex-direction: row;

    &-first {
      width: 60%;
      margin-right: 10px;
    }

    &-second {
      margin-top: 43px;
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

    &__next {
      padding: 9px 25px !important;
    }
  }
}

// @media only screen and (max-width: 991px) {
//   .OrganisationEditForm {
//   }
// }
</style>
