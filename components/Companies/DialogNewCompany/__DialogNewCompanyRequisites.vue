<template>
  <div class="th-company-create-new-requisites-wrapper">
    <div class="th-company-create-new-requisites">
      <el-form
        style="clear: both"
        ref="form"
        :model="company"
        :rules="rules"
        label-width="120px"
        size="mini"
        label-position="top">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <th-organisationo-form-select
              :value="company.organisationForm"
              @onSelect="onOrganisationFormSelect"/>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item
              :label="$t('forms.common.name')"
              prop="name">
              <el-input v-model="company.name" clearable @input="onNameChange">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <th-tax-schemes-select
              :value="company.taxScheme"
              @onSelect="onTaxSchemesSelect"/>
          </el-col>
        </el-row>

        <!-- EDRPOU -->
        <!-- <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.company.common.edrpou')">
              <el-input v-model="company.edrpou" clearable type="number">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> -->

        <!-- INN -->
        <!-- <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.company.common.inn')">
              <el-input v-model="company.inn" clearable type="number">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> -->

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.company.common.description')">
              <el-input v-model="company.description" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
import TaxSchemesSelect from '@/components/TaxSchemes/SelectFormField'

import { VALIDATION_TRIGGER } from '@/utils/forms/constants'

export default {
  components: {
    "th-organisationo-form-select": OrganisationFormSelect,
    "th-tax-schemes-select": TaxSchemesSelect
  },

  props: {
    company: {
      type: Object,
      required: true
    }
  },

  data() {
    const validation = {
      name: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.company.validation.name')))
        }
        cb()
      }
    }

    return {
      rules: {
        name: [{
          required: true,
          validator: validation.name,
          trigger: VALIDATION_TRIGGER,
          max: 100
        }],
      }
    }
  },

  methods: {
    onOrganisationFormSelect: function(value) {
      this.company.organisationForm = value
      this.onNameChange()
    },
    onTaxSchemesSelect: function(value) {
      this.company.taxScheme = value
    },
    onNameChange: function(locale = null) {
      const { name } = this.company
      const { nameUa: ofNameUa, abbrUa } = this.$store.getters['organisationForms/getOrganisationForm'](this.company.organisationForm)
      this.company.fullname = `${ofNameUa} "${name}"`
      this.company.shortname = `${abbrUa} "${name}"`
      this.company.workname = `${name}, ${abbrUa}`
    }
  }
}
</script>

<style lang="scss" scoped>
.th-company-create-new-requisites-wrapper {

  .th-company-create-new-requisites {
    // display: flex;
    // flex-direction: row;

    .th-company-create-new-requisites-right-langs {
      float: right;
      margin: 0 0 15px;

      span {
        font-size: 13px;
        margin: 0 5px;
        padding: 0 5px;
        cursor: pointer;
        color: #409EFF;

        &:hover {
          text-decoration: underline;
        }

        &.active {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
