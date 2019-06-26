<template>
  <el-dialog
    v-bind="attrs"
    :title="$t('forms.company.newCompanyDialog.formTitle')"
    :visible="visible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :before-close="closeWithoutChanges"
    @close="$emit('close')"
  >
    <el-form
      ref="form"
      :model="company"
      :rules="rules"
      label-width="120px"
      size="mini"
      label-position="top"
    >
      <!-- <OrganisationFormSelect
        ref="organisationForm"
        no-init
        label-prop="organisationForm"
        :value="company.organisationFormGuid"
        @onSelect="handleOrganisationFormSelect"
      />-->

      <el-form-item :label="$t('forms.common.name')" prop="name">
        <el-input v-model="company.name" clearable>
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
      </el-form-item>

      <!-- <FormField
        :title="$t('forms.company.profile.fullname')"
        :value="names.fullname"
      />

      <FormField
        :title="$t('forms.company.profile.shortname')"
        :value="names.shortname"
      />

      <FormField
        :title="$t('forms.company.profile.workname')"
        :value="names.workname"
      />-->

      <div class="CompanyCreateNew__submit-wrapper">
        <!-- <Button
          round
          type="primary"
          :disabled="!(company.organisationFormGuid && company.name)"
          @click="handleSubmit"
        >-->

        <Button
          round
          type="primary"
          :disabled="!company.name"
          @click="handleSubmit"
        >{{ $t('forms.company.newCompanyDialog.submit') }}</Button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
//import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
//import FormField from '@/components/Common/FormElements/FormField'
import Button from "@/components/Common/Buttons/Button";

import { VALIDATION_TRIGGER } from "@/utils/constants";
import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

import { showErrorMessage, showSuccessMessage } from "@/utils/messages";

export default {
  name: "th-company-create-new",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    //OrganisationFormSelect,
    //FormField,
    Button
  },

  data() {
    const validation = {
      name: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.company.validation.name")));
        }
        cb();
      }
      // organisationForm: (rule, value, cb) => {
      //   if (!this.company.organisationFormGuid) {
      //     cb(new Error(this.$t('forms.company.validation.organisationForm')))
      //   }
      //   cb()
      // }
    };

    return {
      company: {
        name: ""
        //organisationFormGuid: null
      },

      // names: {
      //   fullname: '',
      //   shortname: '',
      //   workname: ''
      // },

      rules: {
        name: [
          {
            required: true,
            validator: validation.name,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }
        ]
        // organisationForm: [{
        //   required: true,
        //   validator: validation.organisationForm,
        //   trigger: VALIDATION_TRIGGER,
        // }]
      }
    };
  },

  computed: {
    visible() {
      return this.$store.state.companies.showCreateNewDialog;
    },
    attrs() {
      const attrs = {};
      if (this.$_smallDeviceMixin_isDeviceSmall) {
        attrs.top = "0px";
      }
      return attrs;
    }
  },

  methods: {
    reset() {
      this.company.name = "";
      //this.company.organisationFormGuid = null
      // if (this.$refs.organisationForm) {
      //   this.$refs.organisationForm.reset()
      // }
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
    },
    // fillNames() {
    //   const { name, organisationFormGuid }= this.company
    //   if (name && organisationFormGuid) {
    //     const {
    //       nameUa: ofName,
    //       abbrUa: ofAbbr,
    //       type: ofType
    //     } = this.$store.getters['organisationForms/getOrganisationForm'](organisationFormGuid)

    //     const q = ofType === 'fiz' ? '' : '\"'

    //     this.names.fullname = `${ofName} ${q}${name}${q}`
    //     this.names.shortname = `${ofAbbr} ${q}${name}${q}`
    //     this.names.workname = `${name}, ${ofAbbr}`
    //   } else {
    //     this.names = {
    //       fullname: '',
    //       shortname: '',
    //       workname: ''
    //     }
    //   }
    // },

    // handleOrganisationFormSelect(value) {
    //   this.company.organisationFormGuid = value
    // },
    async handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start();

            const payload = {
              ...this.company,
              ownerGuid: this.$store.state.user.guid
            };

            const { companyExist, message } = await this.$store.dispatch(
              "companies/createCompanySimple",
              payload
            );

            if (message) {
              showErrorMessage(message);
            } else if (companyExist) {
              showErrorMessage(
                this.$t("forms.company.messages.companyNameExists")
              );
            } else {
              const m = this.$t(
                "forms.company.messages.companyCreated"
              ).replace("%1", this.company.name);
              showSuccessMessage(m);

              this.$resetData()
              this.$store.dispatch('companies/showCreateNewDialog', false)

              this.$router.push(this.$i18n.path(`workspace/companies/${this.$store.state.companies.currentCompany.guid}`))
            }

            this.$nuxt.$loading.finish();
          });
        }
      });
    },
    closeWithoutChanges() {
      this.$confirm(this.$t("forms.common.closeWindowWithoutChanges"), {
        confirmButtonText: this.$t("forms.common.close"),
        cancelButtonText: this.$t("forms.common.discard"),
        type: "warning",
        roundButton: true
      }).then(() => {
        this.$emit("close")
      });
    }
  },

  watch: {
    visible() {
      if (this.visible) {
        this.reset();
      }
    }
    // 'company.name'() {
    //   this.fillNames()
    // },
    // 'company.organisationFormGuid'() {
    //   this.fillNames()
    // }
  }
};
</script>

<style lang="scss" scoped>
.CompanyCreateNew__submit-wrapper {
  text-align: center;
}
</style>
