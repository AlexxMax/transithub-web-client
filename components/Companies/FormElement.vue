<template>
  <div v-loading.lock="loading">
    <th-form>
      <template slot="header">
        <h3>{{ generateTitle() }}</h3>
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

          <el-row :gutter="20">
            <!-- NAME_UA -->
            <el-col :span="12">
              <el-form-item label="Назва (укр.)">
                <el-input v-model="company.nameUa" clearable @input="onNameChange('ua')">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>

            <!-- NAME_RU -->
            <el-col :span="12">
              <el-form-item label="Назва (рос.)">
                <el-input v-model="company.nameRu" clearable @input="onNameChange('ru')">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <!-- EDRPOU -->
            <el-col :sm="6" :xs="12">
              <el-form-item label="ЄДРПОУ">
                <el-input v-model="company.edrpou" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>

            <!-- INN -->
            <el-col :sm="6" :xs="12">
              <el-form-item label="ІНН">
                <el-input v-model="company.inn" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-tabs v-model="activeTabs">
            <el-tab-pane label="Представлення" name="names">
              <div class="th-content-form-tab">
                <el-row :gutter="20">
                  <!-- FULL_NAME_UA -->
                  <el-col :span="12">
                    <el-form-item label="Повна назва (укр.)">
                      <el-input v-model="company.fullnameUa" readonly />
                    </el-form-item>
                  </el-col>

                  <!-- FULL_NAME_RU -->
                  <el-col :span="12">
                    <el-form-item label="Повна назва (рос.)">
                      <el-input v-model="company.fullnameRu" readonly />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <!-- SHORT_NAME_UA -->
                  <el-col :span="12">
                    <el-form-item label="Скорочена назва (укр.)">
                      <el-input v-model="company.shortnameUa" readonly />
                    </el-form-item>
                  </el-col>

                  <!-- SHORT_NAME_RU -->
                  <el-col :span="12">
                    <el-form-item label="Скорочена назва (рос.)">
                      <el-input v-model="company.shortnameRu" readonly />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <!-- WORK_NAME_UA -->
                  <el-col :span="12">
                    <el-form-item label="Робоча назва (укр.)">
                      <el-input v-model="company.worknameUa" readonly />
                    </el-form-item>
                  </el-col>

                  <!-- WORK_NAME_RU -->
                  <el-col :span="12">
                    <el-form-item label="Робоча назва (рос.)">
                      <el-input v-model="company.worknameRu" readonly />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Контактні дані" name="contacts">
              <div class="th-content-form-tab">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" content="Телефон" placement="top" :open-delay="500">
                      <el-form-item>
                        <el-input v-model="company.phone" clearable size="small">
                          <template slot="prepend"><i class="fas fa-phone" /></template>
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-tooltip>
                  </el-col>

                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" content="Електронна пошта" placement="top" :open-delay="500">
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
                    <el-tooltip class="item" effect="dark" content="Сайт" placement="top" :open-delay="500">
                      <el-form-item>
                        <el-input v-model="company.webpage" clearable size="small">
                          <template slot="prepend"><i class="fas fa-link" /></template>
                          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                        </el-input>
                      </el-form-item>
                    </el-tooltip>
                  </el-col>

                  <el-col :span="12">
                    <el-tooltip class="item" effect="dark" content="Telegram" placement="top" :open-delay="500">
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
                    <el-tooltip class="item" effect="dark" content="Facebook" placement="top" :open-delay="500">
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
            </el-tab-pane>

            <el-tab-pane label="Користувачі" name="users">
              <div class="th-content-form-tab">
                <el-row>
                  <el-col :span="24">
                    <th-toolbar>
                      <th-button type="primary">{{ $store.state.locale === 'ru' ? 'Добавить пользователя' : 'Добавити користувача' }}</th-button>
                    </th-toolbar>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-table :data="users.list" size="medium">
                      <el-table-column
                        fixed
                        label="Користувач">
                        <template slot-scope="scope">
                          <span>{{ getUserName(scope.row) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Електронна пошта">
                        <template slot-scope="scope">
                          <span>{{ scope.row.userEmail }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label=Роль>
                        <template slot-scope="scope">
                          <span>{{ $store.state.locale === 'ru' ? scope.row.nameRu : scope.row.nameUa }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Запрошення">
                        <template slot-scope="scope">
                          <span>
                            <el-tag v-if="scope.row.pendingKey && !scope.row.invitationAccepted">{{ getPendingLabel(scope.row.pendingKey) }}</el-tag>
                            <el-tag type="success" v-if="scope.row.invitationAccepted">{{ $store.state.locale === 'ru' ? 'Принято' : 'Принято' }}</el-tag>
                            <th-button v-if="!scope.row.pendingKey && !scope.row.invitationAccepted" type="text">{{ $store.state.locale === 'ru' ? 'Отправить' : 'Відправити' }}</th-button>
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Активний"
                        width="100">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">
                            <el-switch v-model="scope.row.active" />
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="80">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">
                            <th-table-row-button icon="el-icon-delete" color="red" tooltip="Видалити" />
                          </span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Акредитовані компанії" name="acrred-comps">
              <div class="th-content-form-tab">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-table :data="accredCompanies.list" size="medium">
                      <el-table-column
                        fixed
                        label="Компанія">
                        <template slot-scope="scope">
                          <span>{{ $store.state.locale === 'ru' ? scope.row.opponentWorkNameRu : scope.row.opponentWorkNameUa }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Дата">
                        <template slot-scope="scope">
                          <span>{{ scope.row.accredDate }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Період">
                        <template slot-scope="scope">
                          <span>{{ scope.row.accredPeriod }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Активно"
                        width="100">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">
                            <el-switch v-model="scope.row.active" />
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="80">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">
                            <th-table-row-button icon="el-icon-delete" color="red" tooltip="Видалити" />
                          </span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Розробнику" name="api">
              <el-row :gutter="20">
                <el-col :span="24">
                  <span>API Token:
                    <span style="font-weight: bold">{{ company.apiToken }}</span>
                  </span>
                  <th-button type="text" @click="generateApiToken" style="margin-left: 5px">Згенерувати</th-button>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="Додаткова інформація" name="info">
              <div class="th-content-form-tab">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-input type="textarea" :rows="5" v-model="company.info" />
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-form>
      </template>
    </th-form>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import TableRowButton from '@/components/Common/Buttons/TableRowButton'
import Toolbar from '@/components/Common/Toolbar'
import CommonForm from "@/components/Common/Form"
import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
import TaxSchemesSelect from '@/components/TaxSchemes/SelectFormField'

import { onFormCreated } from "@/utils/formsCommonMethods"
import { generateOrganisationFormSelectOption } from '@/utils/catalogsCommonMethods'

export default {
  components: {
    "th-button": Button,
    "th-table-row-button": TableRowButton,
    "th-toolbar": Toolbar,
    "th-form": CommonForm,
    "th-organisationo-form-select": OrganisationFormSelect,
    "th-tax-schemes-select": TaxSchemesSelect
  },

  data() {
    return {
      company: {},
      users: { list: [], count: 0 },
      accredCompanies: { list: [], count: 0 },

      activeTabs: 'names',
      loading: true
    }
  },

  async created() {
    this.company = { ...this.$store.state.companies.currentCompany }

    await this.fetchCompanyUsers()
    for (const user of this.$store.state.companies.users.list) {
      this.users.list.push({ ...user })
    }
    this.users.count = this.$store.state.companies.users.count

    await this.fetchCompanyAccredCompanies()
    for (const company of this.$store.state.companies.accredCompanies.list) {
      this.accredCompanies.list.push({ ...company })
    }
    this.accredCompanies.count = this.$store.state.companies.accredCompanies.count

    onFormCreated()

    this.loading = false
  },

  methods: {
    fetchCompanyUsers: async function() {
      await this.$store.dispatch('companies/loadCompanyUsers')
    },
    fetchCompanyAccredCompanies: async function() {
      await this.$store.dispatch('companies/loadCompanyAccredCompanies')
    },
    generateTitle: function() {
      return this.$store.state.locale === 'ru' ? this.company.worknameRu : this.company.worknameUa
    },
    onOrganisationFormSelect: function(value) {
      this.company.organisationFormGuid = value
      this.onNameChange()
    },
    onTaxSchemesSelect: function(value) {
      this.company.taxSchemeGuid
    },
    getUserName: function(row) {
      return `${row.firstname} ${row.lastname}`
    },
    getPendingLabel: function(pendingKey) {
      let label = ''
      if (pendingKey) {
        label = 'Відправлено'
        if (this.$store.state.locale === 'ru') {
          label = 'Отправлено'
        }
      }
      return label
    },
    async generateApiToken() {
      await this.$store.dispatch('companies/generateApiToken')
      this.company.apiToken = this.$store.state.companies.currentCompany.apiToken
    },
    onNameChange: function(locale = null) {
      const { nameUa, nameRu } = this.company
      const { nameUa: ofNameUa, nameRu: ofNameRu, abbrUa, abbrRu } = this.$store.getters['organisationForms/getOrganisationForm'](this.company.organisationFormGuid)
      if (locale === 'ua' || locale == null) {
        this.company.fullnameUa = `${ofNameUa} "${nameUa}"`
        this.company.shortnameUa = `${abbrUa} "${nameUa}"`
        this.company.worknameUa = `${nameUa}, ${abbrUa}`
      }
      if (locale === 'ru' || locale == null) {
        this.company.fullnameRu = `${ofNameRu} "${nameRu}"`
        this.company.shortnameRu = `${abbrRu} "${nameRu}"`
        this.company.worknameRu = `${nameRu}, ${abbrRu}`
      }
    }
  }
}
</script>

<style>
.th-content-form-tab {
  margin-bottom: 25px;
}
</style>
