<template>
  <div v-loading.lock="loading">
    <th-form>
      <template slot="header">
        <h3>{{ generateTitle() }}</h3>
      </template>

      <template slot="side">
        <th-sidebar
          :name="company.name || ''"
          @onSave="saveChanges"
          @onClickUsers="visibleDialogCompanyUsers = true"
          @onClickAccredCompanys="visibleDialogAccredCompanies = true"
          @onClickDevelopers="visibleDialogDevelopers = true" />
      </template>

      <template slot="content">
        <el-form :model="company" label-width="100px" label-position="top" size="mini">
          <el-row :gutter="20">
            <!-- ORGANISATION_FORM -->
            <el-col :md="12" :xs="24">
              <th-organisationo-form-select
                :value="company.organisationFormGuid"
                @onSelect="onOrganisationFormSelect"/>
            </el-col>

            <!-- TAX SCHEME -->
            <el-col :md="12" :xs="24">
              <th-tax-schemes-select
                :value="company.taxSchemeGuid"
                @onSelect="onTaxSchemesSelect"/>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="20"> -->
            <!-- NAME_UA -->
            <!-- <el-col :span="12">
              <el-form-item :label="$t('forms.company.common.name')">
                <el-input v-model="company.name" clearable @input="onNameChange('ua')">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col> -->

            <!-- NAME_RU -->
            <!-- <el-col :span="12">
              <el-form-item :label="$t('forms.company.common.nameRu')">
                <el-input v-model="company.nameRu" clearable @input="onNameChange('ru')">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col> -->
          <!-- </el-row> -->

          <!-- DESCRIPTION -->
          <!-- <el-row :gutter="20">
            <el-col :span=24>
              <el-form-item :label="$t('forms.company.common.description')">
                <el-input v-model="company.description" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- // *** Ukraine language only -->
          <el-row :gutter="20">
            <!-- NAME -->
            <el-col :span="12">
              <el-form-item :label="$t('forms.common.name')">
                <el-input v-model="company.name" clearable @input="onNameChange">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>

            <!-- DESCRIPTION -->
            <el-col :span="12">
              <el-form-item :label="$t('forms.company.common.description')">
                <el-input v-model="company.description" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <!-- EDRPOU -->
            <el-col :sm="6" :xs="12">
              <el-form-item :label="$t('forms.company.common.edrpou')">
                <el-input v-model="company.edrpou" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>

            <!-- INN -->
            <el-col :sm="6" :xs="12">
              <el-form-item :label="$t('forms.company.common.inn')">
                <el-input v-model="company.inn" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-collapse v-model="activeCollapse">
            <el-collapse-item :title="$t('forms.company.common.names')" name="names">
              <!-- <div> -->
                <!-- <el-row :gutter="20"> -->
                  <!-- FULL_NAME_UA -->
                  <!-- <el-col :span="12">
                    <el-form-item :label="$t('forms.company.common.fullnameUa')">
                      <el-input v-model="company.fullnameUa" readonly />
                    </el-form-item>
                  </el-col> -->

                  <!-- FULL_NAME_RU -->
                  <!-- <el-col :span="12">
                    <el-form-item :label="$t('forms.company.common.fullnameRu')">
                      <el-input v-model="company.fullnameRu" readonly />
                    </el-form-item>
                  </el-col> -->
                <!-- </el-row> -->

                <!-- <el-row :gutter="20"> -->
                  <!-- SHORT_NAME_UA -->
                  <!-- <el-col :span="12">
                    <el-form-item :label="$t('forms.company.common.shortnameUa')">
                      <el-input v-model="company.shortnameUa" readonly />
                    </el-form-item>
                  </el-col> -->

                  <!-- SHORT_NAME_RU -->
                  <!-- <el-col :span="12">
                    <el-form-item :label="$t('forms.company.common.shortnameRu')">
                      <el-input v-model="company.shortnameRu" readonly />
                    </el-form-item>
                  </el-col> -->
                <!-- </el-row> -->

                <!-- <el-row :gutter="20"> -->
                  <!-- WORK_NAME_UA -->
                  <!-- <el-col :span="12">
                    <el-form-item :label="$t('forms.company.common.worknameUa')">
                      <el-input v-model="company.worknameUa" readonly />
                    </el-form-item>
                  </el-col> -->

                  <!-- WORK_NAME_RU -->
                  <!-- <el-col :span="12">
                    <el-form-item :label="$t('forms.company.common.worknameRu')">
                      <el-input v-model="company.worknameRu" readonly />
                    </el-form-item>
                  </el-col> -->
                <!-- </el-row> -->
              <!-- </div> -->

              <!-- // *** Ukraine language only -->
              <div>
                <el-row :gutter="20">
                  <!-- FULL_NAME_UA -->
                  <el-col :span="12">
                    <el-form-item :label="$t('forms.common.fullname')">
                      <el-input v-model="company.fullname" readonly />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <!-- SHORT_NAME_UA -->
                  <el-col :span="12">
                    <el-form-item :label="$t('forms.common.shortname')">
                      <el-input v-model="company.shortname" readonly />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <!-- WORK_NAME_UA -->
                  <el-col :span="12">
                    <el-form-item :label="$t('forms.common.workname')">
                      <el-input v-model="company.workname" readonly />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>

            <el-collapse-item :title="$t('forms.company.common.contacts')" name="contacts">
              <div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" :content="$t('forms.common.phone')" placement="top" :open-delay="500">
                      <el-form-item>
                        <el-input v-model="company.phone" clearable size="small">
                          <template slot="prepend"><i class="fas fa-phone" /></template>
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-tooltip>
                  </el-col>

                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" :content="$t('forms.common.email')" placement="top" :open-delay="500">
                      <el-form-item>
                        <el-input v-model="company.email" clearable size="small">
                          <template slot="prepend"><i class="fas fa-at" /></template>
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-tooltip>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" :content="$t('forms.common.webpage')" placement="top" :open-delay="500">
                      <el-form-item>
                        <el-input v-model="company.webpage" clearable size="small">
                          <template slot="prepend"><i class="fas fa-link" /></template>
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-tooltip>
                  </el-col>

                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" :content="$t('forms.common.telegram')" placement="top" :open-delay="500">
                      <el-form-item>
                        <el-input v-model="company.telegram" clearable size="small">
                          <template slot="prepend"><i class="fab fa-telegram" /></template>
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-tooltip>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" :content="$t('forms.common.facebook')" placement="top" :open-delay="500">
                      <el-form-item>
                        <el-input v-model="company.facebook" clearable size="small">
                          <template slot="prepend">
                            <i class="fab fa-facebook" />
                          </template>
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>

            <el-collapse-item :title="$t('forms.company.common.info')" name="info">
              <div class="th-content-form-tab">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-input type="textarea" :rows="5" v-model="company.info" />
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </template>
    </th-form>

    <th-dialog-users :visible="visibleDialogCompanyUsers" @close="visibleDialogCompanyUsers = false" />
    <th-dialog-accred-companies :visible="visibleDialogAccredCompanies" @close="visibleDialogAccredCompanies = false" />
    <th-dialog-developers :visible="visibleDialogDevelopers" @close="visibleDialogDevelopers = false" />

  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Toolbar from '@/components/Common/Toolbar'
import CommonForm from "@/components/Common/Form"
import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
import TaxSchemesSelect from '@/components/TaxSchemes/SelectFormField'
import FormSideBar from '@/components/Companies/FormSideBar'
import DialogUsers from '@/components/Companies/DialogCompanyUsers'
import DialogAccredCompanies from '@/components/Companies/DialogCompanyAccredCompanies'
import DialogDevelopers from '@/components/Companies/DialogCompanyDevelopers'

import { onFormCreated } from "@/utils/formsCommonMethods"
import { generateOrganisationFormSelectOption } from '@/utils/catalogsCommonMethods'
import EventBus from '@/utils/eventBus'

export default {
  components: {
    "th-button": Button,
    "th-form": CommonForm,
    "th-organisationo-form-select": OrganisationFormSelect,
    "th-tax-schemes-select": TaxSchemesSelect,
    "th-sidebar": FormSideBar,
    "th-dialog-users": DialogUsers,
    "th-dialog-accred-companies": DialogAccredCompanies,
    "th-dialog-developers": DialogDevelopers
  },

  data() {
    return {
      company: {},

      activeCollapse: ['names', 'contacts', 'info' ],
      loading: true,
      visibleDialogCompanyUsers: false,
      visibleDialogAccredCompanies: false,
      visibleDialogDevelopers: false
    }
  },

  async created() {
    this.company = { ...this.$store.state.companies.currentCompany }
    onFormCreated()
    this.loading = false
  },

  mounted() {
    EventBus.$on('workspace-changed', () => {
      this.$router.push(this.$i18n.path('workspace'))
    })
  },

  methods: {
    saveChanges: async function() {
      this.loading = true
      await this.$store.dispatch('companies/updateCompany', this.company)
      this.company = { ...this.$store.state.companies.currentCompany }
      this.loading = false
    },
    generateTitle: function() {
      // return this.$store.state.locale === 'ru' ? this.company.worknameRu : this.company.worknameUa
      // *** Ukraine language only
      return this.company.worknameUa
    },
    onOrganisationFormSelect: function(value) {
      this.company.organisationFormGuid = value
      this.onNameChange()
    },
    onTaxSchemesSelect: function(value) {
      this.company.taxSchemeGuid = value
    },
    onNameChange: function(locale = null) {
      // const { name, nameRu } = this.company
      // const { name: ofNameUa, nameRu: ofNameRu, abbrUa, abbrRu } = this.$store.getters['organisationForms/getOrganisationForm'](this.company.organisationFormGuid)
      // if (locale === 'ua' || locale == null) {
      //   this.company.fullnameUa = `${ofNameUa} "${name}"`
      //   this.company.shortnameUa = `${abbrUa} "${name}"`
      //   this.company.worknameUa = `${name}, ${abbrUa}`
      // }
      // if (locale === 'ru') {
      //   this.company.fullnameRu = `${ofNameRu} "${nameRu}"`
      //   this.company.shortnameRu = `${abbrRu} "${nameRu}"`
      //   this.company.worknameRu = `${nameRu}, ${abbrRu}`
      // }

      // *** Ukraine language only
      const { name } = this.company
      const { nameUa: ofNameUa, abbrUa } = this.$store.getters['organisationForms/getOrganisationForm'](this.company.organisationFormGuid)
      this.company.fullname = `${ofNameUa} "${name}"`
      this.company.shortname = `${abbrUa} "${name}"`
      this.company.workname = `${name}, ${abbrUa}`
    }
  }
}
</script>

<style>
.th-content-form-tab {
  margin-bottom: 25px;
}
</style>
