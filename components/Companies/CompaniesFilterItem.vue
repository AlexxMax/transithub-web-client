<template>
  <div class="CompaniesFilterItem">
    <div class="CompaniesFilterItem__body">
      <div class="CompaniesFilterItem__col">
        <div class="CompaniesFilterItem__row">
          <div class="CompaniesFilterItem__col CompaniesFilterItem__item CompaniesFilterItem__centered">
            <el-checkbox :value="company.checked" @change="$emit('check', company)"/>
          </div>

          <div class="CompaniesFilterItem__col CompaniesFilterItem__item">
            <CompanyAvatar :name="company.name"/>
          </div>

          <div class="CompaniesFilterItem__col CompaniesFilterItem__item">
            <span class="CompaniesFilterItem__company-name">{{ company.name }}</span>
            <span class="CompaniesFilterItem__company-fullname">{{ company.fullname }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyAvatar from '@/components/Companies/CompanyAvatar'

export default {
  name: 'th-companies-filter-item',

  components: {
    CompanyAvatar
  },

  props: {
    company: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.CompaniesFilterItem {
  margin: {
    top: 10px;
    bottom: 10px;
    right: 5px;
    left: 5px;
  };

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
      right: 20px;
    };
  }

  &__company-name {
    font-size: 14px;
    font-weight: 500;
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

  &__centered {
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 991px) {
  .CompaniesFilterItem {
    &__body {
      flex-direction: column;
    }
  }
}
</style>
