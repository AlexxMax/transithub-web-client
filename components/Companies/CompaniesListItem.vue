<template>
  <div class="CompaniesListItem">
    <nuxt-link :to="$i18n.path(`workspace/companies/${company.guid}`)">
      <Card>

        <div class="CompaniesListItem__body">
          <div class="CompaniesListItem__col">
            <div class="CompaniesListItem__row">
              <div class="CompaniesListItem__col CompaniesListItem__item">
                <CompanyAvatar :name="company.name" />
              </div>

              <div class="CompaniesListItem__col CompaniesListItem__item">
                <span class="CompaniesListItem__company-name">{{ company.name }}</span>
                <span class="CompaniesListItem__company-fullname">{{ company.fullname }}</span>
              </div>
            </div>
          </div>
        </div>

      </Card>
    </nuxt-link>
  </div>
</template>

<script>
import Card from '@/components/Common/Card'
import CompanyAvatar from '@/components/Companies/CompanyAvatar'

export default {
  name: 'th-companies-list-item',

  components: {
    Card,
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
.CompaniesListItem {
  cursor: pointer;
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
}

@media only screen and (max-width: 991px) {
  .CompaniesListItem {
    &__body {
      flex-direction: column;
    }
  }
}
</style>
