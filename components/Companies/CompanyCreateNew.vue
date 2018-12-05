<template>
  <el-dialog
    :title="$t('forms.company.newCompanyDialog.formTitle')"
    :visible="visible"
    width="50%"
    top="50px"
    @close="$emit('close')">

    <el-form
      ref="form"
      :model="company"
      :rules="rules"
      label-width="120px"
      size="mini"
      label-position="top"
    >

      <el-form-item
        :label="$t('forms.common.name')"
        prop="name">
        <el-input v-model="company.name" clearable>
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
      </el-form-item>

      <OrganisationFormSelect
        ref="organisationForm"
        no-init
        label-prop="organisationForm"
        :value="company.organisationFormGuid"
        @onSelect="handleOrganisationFormSelect"
      />

      <FormField
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
      />

      <div class="CompanyCreateNew__submit-wrapper">
        <Button type="primary" @click="handleSubmit">
          {{ $t('forms.company.newCompanyDialog.submit') }}
        </Button>
      </div>

    </el-form>

  </el-dialog>
</template>

<script>
import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
import FormField from '@/components/Common/FormElements/FormField'
import Button from '@/components/Common/Buttons/Button'

import { VALIDATION_TRIGGER } from '@/utils/constants'

import {
  showErrorMessage,
  showSuccessMessage
} from '@/utils/messages'

export default {
  name: 'th-company-create-new',

  components: {
    OrganisationFormSelect,
    FormField,
    Button
  },

  data() {
    const validation = {
      name: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.company.validation.name')))
        }
        cb()
      },
      organisationForm: (rule, value, cb) => {
        if (!this.company.organisationFormGuid) {
          cb(new Error(this.$t('forms.company.validation.organisationForm')))
        }
        cb()
      }
    }

    return {
      company: {
        name: '',
        organisationFormGuid: null
      },

      names: {
        fullname: '',
        shortname: '',
        workname: ''
      },

      rules: {
        name: [{
          required: true,
          validator: validation.name,
          trigger: VALIDATION_TRIGGER,
          max: 100
        }],
        organisationForm: [{
          required: true,
          validator: validation.organisationForm,
          trigger: VALIDATION_TRIGGER,
        }]
      }
    }
  },

  computed: {
    visible() {
      return this.$store.state.companies.showCreateNewDialog
    }
  },

  methods: {
    reset() {
      this.company.name = ''
      this.company.organisationFormGuid = null
      this.$refs.organisationForm.reset()
      this.$refs.form.resetFields()
    },
    fillNames() {
      const { name, organisationFormGuid }= this.company
      if (name && organisationFormGuid) {
        const { nameUa: ofName, abbrUa: ofAbbr } = this.$store.getters['organisationForms/getOrganisationForm'](organisationFormGuid)
        this.names.fullname = `${ofName} "${name}"`
        this.names.shortname = `${ofAbbr} "${name}"`
        this.names.workname = `${name}, ${ofAbbr}`
      } else {
        this.names = {
          fullname: '',
          shortname: '',
          workname: ''
        }
      }
    },
    handleOrganisationFormSelect(value) {
      this.company.organisationFormGuid = value
    },
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()

            const payload = {
              ...this.company,
              ownerGuid: this.$store.state.user.guid
            }

            const {
              companyExist,
              message
            } = await this.$store.dispatch('companies/createCompanySimple', payload)

            if (message) {
              showErrorMessage(message)
            } else if (companyExist) {
              showErrorMessage(this.$t('forms.company.messages.companyNameExists'))
            } else {
              const m = this.$t('forms.company.messages.companyCreated').replace('%1', this.names.fullname)
              showSuccessMessage(m)

              this.$resetData()
              this.$store.dispatch('companies/showCreateNewDialog', false)
            }

            this.$nuxt.$loading.finish()
          })
        }
      })
    }
  },

  watch: {
    visible() {
      if (this.visible) {
        this.reset()
      }
    },
    'company.name'() {
      this.fillNames()
    },
    'company.organisationFormGuid'() {
      this.fillNames()
    }
  }
}
</script>

<style lang="scss" scoped>
.CompanyCreateNew__submit-wrapper {
  text-align: center;
}
</style>
