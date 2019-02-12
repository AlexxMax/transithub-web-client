<template>
  <div class="CompaniesFilter" :class="{ 'CompaniesFilter__invisible': invisible }">
    <Tooltip :slot-content="tooltipContent" placement="bottom">
      <div class="CompaniesFilter__selector" @click="dialogVisible = true">
        <div
          class="CompaniesFilter__selector-item"
          v-for="company of companiesForWidget"
          :key="company.guid"
        >
          <CompanyAvatar
            :name="company.name"
            :size="30"
          />
        </div>
      </div>
    </Tooltip>

    <el-dialog
      :title="$t('forms.company.companiesFilter.dialogTitle')"
      :visible.sync="dialogVisible"
      :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
      :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    >
      <div class="CompaniesFilter__header">
        <el-checkbox
          class="CompaniesFilter__header-checkbox"
          :value="allCompaniesChecked"
          @change="handleAllCompaniesCheck"
        />
        <div class="CompaniesFilter__header-title">{{ $t('forms.common.company') }}</div>
      </div>

      <CompaniesFilterItem
        v-for="company of companiesWithMarks"
        :key="company.guid"
        :company="company"
        @check="handleCompanyCheck"
      />
    </el-dialog>
  </div>
</template>

<script>
import _orderBy from 'lodash.orderby'

import CompanyAvatar from '@/components/Companies/CompanyAvatar'
import CompaniesFilterItem from '@/components/Companies/CompaniesFilterItem'
import Tooltip from '@/components/Common/Tooltip'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-companies-filter',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    CompanyAvatar,
    CompaniesFilterItem,
    Tooltip
  },

  data: () => ({ dialogVisible: false }),

  computed: {
    companiesGlobalFilter: {
      get() {
        return this.$store.state.companies.globalFilter
      },
      set(value) {
        this.$store.dispatch('companies/setCompaniesGlobalFilter', value)
        this.$emit('change')
      }
    },
    companiesWithMarks() {
      return this.$store.state.companies.list.map(({ guid, name, fullname }) => ({
        guid,
        name,
        fullname,
        checked: this.companiesGlobalFilter ? this.companiesGlobalFilter.some(item => item.guid === guid) : false
      }))
    },
    companiesChecked() {
      return this.companiesWithMarks.filter(({ checked }) => checked)
    },
    companiesForWidget() {
      const companies = this.companiesChecked.length > 0 ? this.companiesChecked : this.companiesWithMarks
      return _orderBy(companies.slice(0, 5), [ 'name' ], [ 'asc' ])
    },
    invisible() {
      return this.companiesWithMarks.length <= 1
    },
    tooltipContent() {
      if (this.companiesChecked.length > 0) {
        return this.companiesChecked.map(({ name }) => (name)).join('<br/>')
      }
      return this.$t('forms.company.companiesFilter.noCompaniesSelected')
    },
    allCompaniesChecked() {
      return this.companiesChecked.length === this.$store.state.companies.list.length
    }
  },

  methods: {
    handleCompanyCheck(company) {
      const checked = !company.checked

      if (this.companiesGlobalFilter) {
        const companyGlobalFilter = this.companiesGlobalFilter.find(({ guid }) => guid === company.guid)
        if (companyGlobalFilter && !checked) {
          this.companiesGlobalFilter = this.companiesGlobalFilter
            .filter(({ guid }) => guid !== company.guid)
            .map(({ guid }) => ({ guid }))
        } else if (!companyGlobalFilter && checked) {
          this.companiesGlobalFilter = [ ...this.companiesGlobalFilter, { guid: company.guid } ]
        }
      } else if (checked) {
        this.companiesGlobalFilter = [ { guid: company.guid } ]
      }
    },
    handleAllCompaniesCheck(value) {
      if (value) {
        this.companiesGlobalFilter = this.$store.state.companies.list.map(({ guid }) => ({ guid }))
      } else {
        this.companiesGlobalFilter = []
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.CompaniesFilter {
  margin: {
    left: 5px;
    right: 5px;
  };

  &__invisible {
    display: block;
  }

  &__selector {
    cursor: pointer;
    margin: { top: -3px;};
    border: {
      radius: 5px;
    };
    padding: 5px;
    display: flex;
    flex: {
      direction: row;
    };

    &:hover {
      background: {
        color: #F4F4F4;
      }
    }

    &-item {
      margin: { left: 2px; };
    }
  }

  &__header {
    display: flex;
    flex-direction: row;
    margin: {
      bottom: 20px;
    };

    &-checkbox {
      margin: {
        left: 5px;
      };
    }

    &-title {
      margin: {
        left: 20px;
      };
    }
  }
}
</style>
