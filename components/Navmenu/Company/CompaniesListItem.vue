<template>
  <div class="CompaniesListItem">
    <div class="CompaniesListItem__body">
      <div class="CompaniesListItem__col">
        <div class="CompaniesListItem__row" @click="setAsCurrent(company.guid)">
          <div class="CompaniesListItem__col CompaniesListItem__item">
            <CompanyAvatar :name="company.name" :size="36" />
          </div>

          <div class="CompaniesListItem__col CompaniesListItem__item">
            <span class="CompaniesListItem__CompanyName">{{ company.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyAvatar from '@/components/Companies/CompanyAvatar'

export default {
  name: 'th-companies-list-item',

  components: {
    CompanyAvatar
  },

  props: {
    company: {
      type: Object,
      required: true
    }
  },

  methods: {
    setAsCurrent: function(guid) {
      const company = this.$store.getters['companies/getCompanyByGuid'](guid)
      this.$store.dispatch('companies/setCurrentCompany', company)
    }
  }
}
</script>

<style lang='scss' scoped>
.CompaniesListItem {
  cursor: pointer;
  margin: {
    top: 10px;
    bottom: 10px;
  };
  transition: .5s;

  &:hover {
    padding-left: 2px;
    background-color: rgba(254, 205, 52, 0.15) !important;
    border-radius: 5px;
  }

  &__body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__col {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    flex-direction: row;
  }

  &__item {
    margin: {
      right: 10px;
    };
  }

  &__CompanyName {
    font-size: 14px;
    font-family: Montserrat;
    color: #606266 !important;
    font-weight: 400 !important;
  }

  &__company-fullname {
    margin: {
      top: 3px;
    };
    font: {
      size: 12px;
    };
    color: #909399;
  }
}

@media only screen and (max-width: 991px) {
  .CompaniesListItem {
    &__body {
      flex-direction: column;
    }
  }
}
</style>