<template>
  <div>
    <th-common-list
      :count="count"
      @eventFetch="_fetch">
      <div style="margin: 0 10px">
        <th-list-header :cols="cols" />
      </div>
      <th-toolbar slot="toolbar">
        <div slot="left">
          <th-button type="" @click="$emit('showFilter')">
            <fa icon="filter" />
            <span>{{ `${$t('lists.filter')}${filterSet ? ': ' + $t('lists.filterSet') : ''}` }}</span>
          </th-button>
        </div>
      </th-toolbar>

      <th-item v-for="(item, index) of items" :key="index">
        <el-row :gutter="10">
          <el-col :xs="24" :md="3">
            <div class="th-vehicles-registers-list-item-column-title">
              {{ $t('lists.period') + ': ' }}
            </div>
            <div class="th-vehicles-registers-list-item-column-value">
              {{ `${item.periodFrom} ${item.periodTo}` }}
            </div>
          </el-col>

          <el-col :xs="24" :md="6">
            <div class="th-vehicles-registers-list-item-column-title">
              {{ $t('lists.driver') + ': ' }}
            </div>
            <div class="th-vehicles-registers-list-item-column-value">
              {{ item.driverFullname }}
            </div>
          </el-col>

          <el-col :xs="24" :md="5">
            <div class="th-vehicles-registers-list-item-column-title">
              {{ $t('lists.phone') + ': ' }}
            </div>
            <div class="th-vehicles-registers-list-item-column-value">
              {{ item.phone }}
            </div>
          </el-col>

          <el-col :xs="24" :md="6">
            <div class="th-vehicles-registers-list-item-column-title">
              {{ $t('lists.vehicleNumber') + ': ' }}
            </div>
            <div class="th-vehicles-registers-list-item-column-value">
              {{ `${item.vehicleNumber} ${item.vehicleBrand}` }}
            </div>
          </el-col>

          <el-col :xs="24" :md="2">
            <div class="th-vehicles-registers-list-item-column-title">
              {{ $t('lists.quantityRace') + ': ' }}
            </div>
            <div class="th-vehicles-registers-list-item-column-value">
              {{ item.tripsQuantity }}
            </div>
          </el-col>

          <el-col :xs="24" :md="2">
            <div class="th-vehicles-registers-list-item-column-title">
              {{ $t('lists.status') + ': ' }}
            </div>
            <div
              class="th-vehicles-registers-list-item-column-value"
              :style="{ 'text-transform': 'capitalize', 'color': item.status.color }">
              {{ $t(item.status.localeKey) }}
            </div>
          </el-col>
        </el-row>
      </th-item>
    </th-common-list>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Toolbar from '@/components/Common/ListToolbar'
import CommonList from '@/components/Common/List'
import ListHeader from '@/components/Common/Lists/Header'
import SubordinateItem from '@/components/Common/Lists/SubordinateItem'

export default {
  components: {
    'th-button': Button,
    'th-list-header': ListHeader,
    'th-toolbar': Toolbar,
    'th-common-list': CommonList,
    'th-item': SubordinateItem
  },

  props: {
    requestGuid: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      cols: [{
        col: 'period',
        width: 3,
        title: this.$t('lists.period')
      }, {
        col: 'driver',
        width: 6,
        title: this.$t('lists.driver')
      }, {
        col: 'phone',
        width: 5,
        title: this.$t('lists.phone')
      }, {
        col: 'vehicleNumber',
        width: 6,
        title: this.$t('lists.vehicleNumber')
      }, {
        col: 'quantityRace',
        width: 2,
        title: this.$t('lists.quantityRace')
      }, {
        col: 'status',
        width: 2,
        title: this.$t('lists.status')
      }],

      filterSet: false
    };
  },

  async created() {
    this._fetch()
  },

  methods: {
    _fetch: async function() {
      this.$store.commit('vehiclesRegisters/SET_FILTER_REQUEST_GUID', this.requestGuid)
      await this.$store.dispatch('vehiclesRegisters/load')
    }
  },

  computed: {
    count: function() {
      return this.$store.state.vehiclesRegisters.count
    },
    items: function() {
      return this.$store.state.vehiclesRegisters.list
    }
  }
}
</script>

<style lang="scss" scoped>
.th-vehicles-registers-list-item-column-value {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
}

.th-vehicles-registers-list-item-column-title {
  display: none;
}

@media only screen and (max-width: 990px) {
  .th-vehicles-registers-list-item-column-value {
    margin-top: 0;
    // height: 20px;
    // margin-bottom: 5px;
  }

  .th-vehicles-registers-list-item-column-title {
    font-size: 12px;
    font-weight: 200;
    color: #606266;
    display: block;
  }
}
</style>

