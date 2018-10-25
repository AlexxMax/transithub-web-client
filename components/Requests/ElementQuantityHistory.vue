<template>
  <RightView 
    :visible="visible"
    :title="$t('forms.request.quantityHistorySideMenu')"
    @close="$emit('close')">

    <div v-loading="loading">
      <el-form
        label-width="120px"
        label-position="top"
        size="mini"
        @submit.native.prevent>
        <el-form-item :label="$t('lists.filters.period')" >
          <el-date-picker
            style="width: 100%"
            type="daterange"
            format="dd.MM.yyyy"
            v-model="filterPeriod"
            :range-separator="$t('lists.filters.periodTo')"
            :start-placeholder="$t('lists.filters.periodStart')"
            :end-placeholder="$t('lists.filters.periodEnd')"
            :picker-options="pickerOptions"
            @change="filterHistory"
            clearable>
          </el-date-picker>
        </el-form-item>
      </el-form>
        
      <el-card class="History__box-card" v-for="(item, index) in history" :key="index" >
        <div class="History__box-card__item">
           <div class="History__box-card__item-wrapper">
            <span class="History__box-card__item-label">
              {{ `${$t('forms.common.date')}` }}:
              <span class="History__box-card__item-value">{{item.date }}</span>
            </span>
          </div>

          <div class="History__box-card__item-wrapper">
            <span class="History__box-card__item-label">
              {{ `${$t('forms.request.quantityT')}` }}:
              <span class="History__box-card__item-value">{{item.quantityT }}</span>
            </span>
          </div>

          <div class="History__box-card__item-wrapper">
            <span class="History__box-card__item-label">
              {{ `${$t('forms.request.quantityVehicles')}` }}:
              <span class="History__box-card__item-value">{{item.quantityVehicles }}</span>
            </span>
          </div>
          
          <div class="History__box-card__item-wrapper">
            <span class="History__box-card__item-label">
              {{ `${$t('forms.request.vehiclesLimitation')}` }}:
              <span class="History__box-card__item-value">{{item.vehiclesLimitation }}</span>
            </span>
          </div>

          <div class="History__box-card__item-wrapper">
            <div class="History__box-card__item-label">
              {{ `${$t('forms.common.comment')}` }}:
              <div class="History__box-card__item-value">{{item.comment }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </RightView>
</template>

<script>
import RightView from "@/components/Common/RightView"

export default {
  name: 'th-element-quentity-history',

  components: {
    RightView
  },

  props: {
    visible: Boolean,
    request: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      loading: false,
      history: [],
      filterPeriod: [],
      pickerOptions: {
        firstDayOfWeek: 1
      }
    }
  },

  methods: {
    async _fetch() {
      this.loading = true
      await this.$store.dispatch('requests/loadElementQuantityHistory', this.request)
      this.loading = false
    },

    filterHistory() {
      const [ periodFrom, periodTo ] = this.filterPeriod || [ null, null ]

      const history = this.$store.state.requests.itemQuantityHistory
      this.history = history.filter(item => {
        let moreThanPeriodFrom = !!periodFrom ? item.dateUtc >= periodFrom : true
        let lessThanPeriodTo = !!periodTo ? item.dateUtc < periodTo : true
        return moreThanPeriodFrom && lessThanPeriodTo
      })
    }
  },

  async created() {
    await this._fetch()
    this.filterHistory()
  }
}
</script>

<style lang="scss" scoped>
.History__box-card {
  margin-bottom: 20px;
  box-shadow: none;

  .History__box-card__item-wrapper {
    padding: 3px 0;

    .History__box-card__item-label {
      color: #b7b7b7;

      .History__box-card__item-value {
        color:#606266;;
      }
    }
  }
}
</style>

