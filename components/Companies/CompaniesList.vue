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
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import CompaniesListItem from '@/components/Companies/CompaniesListItem'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-companies-list',

  components: {
    CommonList,
    CompaniesListItem,
    Button
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
