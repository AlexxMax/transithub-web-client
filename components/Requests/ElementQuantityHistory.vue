<template>
  <RightView 
    :visible="visible"
    :title="$t('forms.request.quantityHistorySideMenu')"
    @close="$emit('close')">

    <div v-loading="loading">
      <span>
        {{ `${$t('lists.filters.period')}` }}
      </span>

      <el-date-picker
        style="width: 90%; margin: 10px 0 30px 0;"
        type="daterange"
        format="dd.MM.yyyy"
        v-model="filterPeriod"
        :range-separator="$t('lists.filters.periodTo')"
        :start-placeholder="$t('lists.filters.periodStart')"
        :end-placeholder="$t('lists.filters.periodEnd')"
        :picker-options="pickerOptions"
        @change="setFilterPeriod"
        clearable>
      </el-date-picker>
        
      <el-card class="History__box-card" v-for="(item, index) in history" :key="index" >
        <div class="History__box-card__item">
          <!-- <div class="item-row">{{ `${$t('forms.common.date')}: ${item.createdAt}` }}</div>
          <div class="item-row">{{ `${$t('forms.request.quantityT')}: ${item.quantityT}` }}</div>
          <div class="item-row">{{ `${$t('forms.request.quantityVehicles')}: ${item.quantityVehicles}` }}</div>
          <div class="item-row">{{ `${$t('forms.request.vehiclesLimitation')}: ${item.vehiclesLimitation}` }}</div>
          <div class="item-row">{{ `${$t('forms.common.comment')}: ${item.comment}` }}</div> -->
          
           <div class="History__box-card__item-wrapper">
            <span class="History__box-card__item-label">
              {{ `${$t('forms.common.date')}` }}:
              <span class="History__box-card__item-value">{{item.createdAt }}</span>
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
            <span class="History__box-card__item-label">
              {{ `${$t('forms.common.comment')}` }}:
              <span class="History__box-card__item-value">{{item.comment }}</span>
            </span>
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
      item: {},

      filterPeriod: null,
      pickerOptions: {
        firstDayOfWeek: 1
      },
    }
  },

  computed: {
    history() {
      return this.$store.state.requests.itemQuantityHistory
    }
  },

  methods: {
    async _fetch() {
      this.loading = true
      await this.$store.dispatch('requests/loadElementQuantityHistory', this.request)
      this.loading = false
    },

    setFilterPeriod: function() {
      this.$store.dispatch('requests/setFilterPeriod', this.filterPeriod)
    }
  },

  async created() {
    await this._fetch()

    const periodFrom = this.$store.state.requests.filters.periodFrom
    const periodTo = this.$store.state.requests.filters.periodTo
    if (periodFrom && periodTo) {
      this.filterPeriod = [periodFrom, periodTo]
    }
  }
}
</script>

<style lang="scss" scoped>
.History__box-card {
  width: 90%;
  margin-bottom: 20px;

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

