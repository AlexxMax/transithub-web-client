<template>
  <div class="CompaniesListItem" @click="setAsCurrent(company.guid)">
    <div class="CompaniesListItem__body">
      <div class="CompaniesListItem__col">
        <div class="CompaniesListItem__row">
          <div class="CompaniesListItem__col CompaniesListItem__item">
            <CompanyAvatar :name="company.name" :size="36" />
          </div>

          <div class="CompaniesListItem__col CompaniesListItem__item">
            <span class="CompaniesListItem__CompanyName">{{ company.name }}</span>
          </div>

          <div class="CompaniesListItem__icon">
            <span v-if="isCurrent">
              <fa icon="check" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyAvatar from '@/components/Companies/CompanyAvatar'

export default {
  name: "th-companies-list-item",

  components: {
    CompanyAvatar
  },

  props: {
    company: {
      type: Object,
      required: true
    }
  },

  computed: {
    currentCompany() {
      return this.$store.getters["companies/getCurrentCompany"];
    },
    isCurrent() {
      return this.currentCompany.guid === this.company.guid;
    }
  },

  methods: {
    setAsCurrent: function(guid) {
      this.$store.dispatch("companies/setCurrentCompany", this.company);
    }
  }
};
</script>

<style lang='scss' scoped>
.CompaniesListItem {
  cursor: pointer;
  transition: 0.5s;

  &__body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  &__item {
    margin: {
      right: 20px;
    }
  }

  &__CompanyName {
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    color: #606266 !important;
    font-weight: 400 !important;
  }

  &__icon {
    position: absolute;
    left: 255px;
    color: #67c23a;
  }

  &__company-fullname {
    margin: {
      top: 3px;
    }
    font: {
      size: 12px;
    }
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
