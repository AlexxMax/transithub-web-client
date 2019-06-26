<template>
  <div class="CompaniesListItem">
    <Card>
      <div class="CompaniesListItem__body">
        <div class="CompaniesListItem__col">
          <div class="CompaniesListItem__row">
            <div class="CompaniesListItem__col CompaniesListItem__item">
              <CompanyAvatar :name="company.name" />
            </div>

            <div class="CompaniesListItem__col CompaniesListItem__item">
              <span class="CompaniesListItem__company-name">{{ company.name }}</span>
            </div>
          </div>

          <div slot="footer-left" class="CompaniesListItem__footer">
            <nuxt-link :to="$i18n.path(`workspace/companies/${company.guid}`)">
              <Button 
                type="primary"
                round
              >
              {{ $t('lists.open') }}
              </Button>
            </nuxt-link>

            <Button
              round
              type=""
              @click="$emit('open-organisations-form', company)" 
            >
              {{ $t('forms.organisation.organisations') }}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Common/Card'
import CompanyAvatar from '@/components/Companies/CompanyAvatar'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-companies-list-item',

  components: {
    Card,
    CompanyAvatar,
    Button
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

    display: flex;
    justify-content: center;
  }

  &__company-name {
    font-size: 14px;
    font-weight: 500;
  }

  &__footer {
    margin: 10px -20px -20px -20px;
    padding: 10px 15px;
  }
}

.el-card.is-hover-shadow:hover {
  box-shadow: none;
}

@media only screen and (max-width: 991px) {
  .CompaniesListItem {
    &__body {
      flex-direction: column;
    }
  }
}
</style>
