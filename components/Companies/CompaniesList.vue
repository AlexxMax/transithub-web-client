<template>
  <div>
    <CommonList
      size="compact"
      :no-pagination="true"
      :count="companies.length"
      :title="$t('forms.common.companies')"
    >

      <div
        slot="toolbar"
        class="CompaniesList__toolbar"
      >
        <Button
          round
          type="primary"
          fa-icon="plus"
          @click="$store.dispatch('companies/showCreateNewDialog', true)"
        >
          {{ $t('forms.common.createNewCompany') }}
        </Button>
      </div>

      <CompaniesListItem
        v-for="company of companies"
        :key="company.guid"
        :company="company"
        @open-organisations-form="showOrganisationsForm"
      />
    </CommonList>

    <OrganisationsForm
      ref="organisations-form"
      :company="currentCompany"
    />
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import CompaniesListItem from '@/components/Companies/CompaniesListItem'
import Button from '@/components/Common/Buttons/Button'
import OrganisationsForm from '@/components/Organisations/OrganisationsForm'

export default {
  name: 'th-companies-list',

  components: {
    CommonList,
    CompaniesListItem,
    Button,
    OrganisationsForm
  },

  props: {
    companies: {
      type: Array,
      default: () => ([])
    }
  },

  data: () => ({ currentCompany: {} }),

  methods: {
    showOrganisationsForm(company) {
      this.currentCompany = company
      this.$refs['organisations-form'].show()
    }
  }
}
</script>

<style lang='scss' scoped>
.CompaniesList__toolbar {
  margin: {
    top: 20px;
    bottom: 20px;
  }
}
</style>
