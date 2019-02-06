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
      />
    </CommonList>

    <CompanyCreateNew @close="$store.dispatch('companies/showCreateNewDialog', false)"/>
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import CompaniesListItem from '@/components/Companies/CompaniesListItem'
import Button from '@/components/Common/Buttons/Button'
import CompanyCreateNew from '@/components/Companies/CompanyCreateNew'

export default {
  name: 'th-companies-list',

  components: {
    CommonList,
    CompaniesListItem,
    Button,
    CompanyCreateNew
  },

  props: {
    companies: {
      type: Array,
      default: () => ([])
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
