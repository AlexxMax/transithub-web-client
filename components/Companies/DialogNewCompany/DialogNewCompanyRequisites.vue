<template>
  <div class="th-company-create-new-requisites-wrapper">
    <div class="th-company-create-new-requisites">
      <!-- <div class="th-company-create-new-requisites-right-langs">
        <span @click="activeLang = 'ua'" v-bind:class="{ active: activeLang === 'ua' }">Укр</span>
        <span @click="activeLang = 'ru'" v-bind:class="{ active: activeLang === 'ru' }">Рус</span>
      </div> -->

      <el-form style="clear: both" ref="form" :model="company" label-width="120px" size="mini" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="24">
                <th-organisationo-form-select
                  :value="company.organisationForm"
                  @onSelect="onOrganisationFormSelect"/>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item :label="$t('forms.common.name')">
                  <el-input v-model="company.name" clearable @input="onNameChange">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- // *** Ukraine language only -->
            <!-- <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item :label="$t('forms.company.common.nameRu')">
                  <el-input v-model="company.nameRu" clearable @input="onNameChange('ru')">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row> -->

            <el-row :gutter="20">
              <el-col :span="24">
                <th-tax-schemes-select
                  :value="company.taxScheme"
                  @onSelect="onTaxSchemesSelect"/>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span=24>
                <el-form-item :label="$t('forms.company.common.description')">
                  <el-input v-model="company.description" clearable>
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <!-- EDRPOU -->
              <el-col :span="12">
                <el-form-item :label="$t('forms.company.common.edrpou')">
                  <el-input v-model="company.edrpou" clearable type="number">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>
              </el-col>

              <!-- INN -->
              <el-col :span="12">
                <el-form-item :label="$t('forms.company.common.inn')">
                  <el-input v-model="company.inn" clearable type="number">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12">
            <el-row :gutter="20">
              <!-- FULL_NAME_UA -->
              <el-col :span="24">
                <el-form-item :label="$t('forms.common.fullname')">
                  <el-input v-model="company.fullname" readonly />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <!-- SHORT_NAME_UA -->
              <el-col :span="24">
                <el-form-item :label="$t('forms.common.shortname')">
                  <el-input v-model="company.shortname" readonly />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <!-- WORK_NAME_UA -->
              <el-col :span="24">
                <el-form-item :label="$t('forms.common.workname')">
                  <el-input v-model="company.workname" readonly />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- // *** Ukraine language only -->
            <!-- <div v-if="activeLang === 'ru'"> -->
              <!-- <el-row :gutter="20"> -->
                <!-- FULL_NAME_RU -->
                <!-- <el-col :span="24">
                  <el-form-item :label="$t('forms.company.common.fullnameRu')">
                    <el-input v-model="company.fullnameRu" readonly />
                  </el-form-item>
                </el-col>
              </el-row> -->

              <!-- <el-row :gutter="20"> -->
                <!-- SHORT_NAME_RU -->
                <!-- <el-col :span="24">
                  <el-form-item :label="$t('forms.company.common.shortnameRu')">
                    <el-input v-model="company.shortnameRu" readonly />
                  </el-form-item>
                </el-col>
              </el-row> -->

              <!-- <el-row :gutter="20"> -->
                <!-- WORK_NAME_RU -->
                <!-- <el-col :span="24">
                  <el-form-item :label="$t('forms.company.common.worknameRu')">
                    <el-input v-model="company.worknameRu" readonly />
                  </el-form-item>
                </el-col>
              </el-row> -->
            <!-- </div> -->

          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
import TaxSchemesSelect from '@/components/TaxSchemes/SelectFormField'

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

  methods: {
    onOrganisationFormSelect: function(value) {
      this.company.organisationForm = value
      this.onNameChange()
    },
    onTaxSchemesSelect: function(value) {
      this.company.taxScheme = value
    },
    onNameChange: function(locale = null) {
      // const { name, nameRu } = this.company
      // const { name: ofNameUa, nameRu: ofNameRu, abbrUa, abbrRu } = this.$store.getters['organisationForms/getOrganisationForm'](this.company.organisationForm)
      // if (locale === 'ua' || locale == null) {
      //   this.company.fullnameUa = `${ofNameUa} "${name}"`
      //   this.company.shortnameUa = `${abbrUa} "${name}"`
      //   this.company.worknameUa = `${name}, ${abbrUa}`
      // }
      // if (locale === 'ru' || locale == null) {
      //   this.company.fullnameRu = `${ofNameRu} "${nameRu}"`
      //   this.company.shortnameRu = `${abbrRu} "${nameRu}"`
      //   this.company.worknameRu = `${nameRu}, ${abbrRu}`
      // }

      // *** Ukraine language only
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
