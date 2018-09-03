<template>
  <div>
    <th-toolbar>
      <div slot="left">
        <div class="th-list-toolbar-left">
          <el-input
            class="th-list-toolbar-search"
            size="small"
            :placeholder="$t('lists.search')"
            prefix-icon="el-icon-search"
            clearable
            v-model="search"
            @change="setSearch">
          </el-input>

          <th-button v-show="!smallDevice" type="" @click="rightViewVisible = !rightViewVisible">
            <fa icon="filter" />
            <span>{{ `${$t('lists.filter')}${searchSet ? ': ' + $t('lists.filterSet') : ''}` }}</span>
          </th-button>
        </div>
      </div>

      <div slot="right">
        <th-button v-show="!smallDevice" type="primary">{{ $t('lists.createNewRequests') }}</th-button>
        <el-dropdown size="mini" v-show="smallDevice">
          <th-button type="">
            <fa icon="bars" />
          </th-button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-show="smallDevice">
              <span>{{ $t('lists.createNewRequests') }}</span>
            </el-dropdown-item>

            <el-dropdown-item divided v-show="smallDevice">
              <span @click="rightViewVisible = !rightViewVisible">
                <span>{{ `${$t('lists.filter')}${searchSet ? ': ' + $t('lists.filterSet') : ''}` }}</span>
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </th-toolbar>

    <th-right-view
      :show="rightViewVisible"
      :title="$t('lists.filter')"
      @close="rightViewVisible = false">
      <el-form ref="form" label-width="120px" label-position="top" size="mini">
        <el-form-item :label="$t('lists.filters.number')" >
          <el-select
            style="width: 100%"
            v-model="filterNumber"
            multiple
            filterable
            allow-create
            placeholder="Select"
            @change="setFilterNumber">
            <el-option
              v-for="item in numbers"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('lists.filters.period')" >
          <el-date-picker
            style="width: 100%"
            v-model="filterPeriod"
            type="daterange"
            format="dd.MM.yyyy"
            :range-separator="$t('lists.filters.periodTo')"
            :start-placeholder="$t('lists.filters.periodStart')"
            :end-placeholder="$t('lists.filters.periodEnd')"
            :picker-options="pickerOptions"
            @change="setFilterPeriod">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('lists.filters.client')" >
          <el-select
            style="width: 100%"
            v-model="filterClient"
            multiple
            filterable
            allow-create
            placeholder="Select"
            @change="setFilterClient">
            <el-option
              v-for="item in clients"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('lists.filters.goods')" >
          <el-select
            style="width: 100%"
            v-model="filterGoods"
            multiple
            filterable
            allow-create
            placeholder="Select"
            @change="setFilterGoods">
            <el-option
              v-for="item in goods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('lists.filters.pointFrom')">
          <el-input v-model="pointFrom" placeholder="Please input" readonly clearable>
            <el-button slot="append" icon="el-icon-more" @click="visiblePointsFromSelect = true"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('lists.filters.pointTo')">
          <el-input v-model="pointTo" placeholder="Please input" readonly>
            <el-button slot="append" icon="el-icon-more" @click="visiblePointsToSelect = true"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('lists.filters.status')" >
          <el-select
            style="width: 100%"
            v-model="filterStatus"
            multiple
            filterable
            allow-create
            placeholder="Select"
            @change="setFilterStatuses">
            <el-option
              v-for="item in statuses"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </th-right-view>

    <th-points-select
      :visible="visiblePointsFromSelect"
      @close="visiblePointsFromSelect = false"
      @select="selectPointsFrom"/>
    <th-points-select
      :visible="visiblePointsToSelect"
      @close="visiblePointsToSelect = false"
      @select="selectPointsTo"/>
  </div>
</template>

<script>
import _uniq from 'lodash.uniq'

import Toolbar from '@/components/Common/ListToolbar'
import RightView from '@/components/Common/RightView'
import Button from '@/components/Common/Buttons/Button'
import PointSelect from '@/components/Common/PointsSelect'

import { getStatusFilters } from '@/utils/requests'
import API from '@/utils/api'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    'th-toolbar': Toolbar,
    'th-right-view': RightView,
    'th-button': Button,
    'th-points-select': PointSelect
  },

  data() {
    return {
      search: '',

      numbers: [],
      clients: [],
      goods: [],
      statuses: [],

      filterNumber: [],
      filterPeriod: null,
      filterClient: [],
      filterGoods: [],
      filterStatus: [],
      rightViewVisible: false,

      pointFrom: '',
      pointTo: '',

      pickerOptions: {
        firstDayOfWeek: 1
      },

      visiblePointsFromSelect: false,
      visiblePointsToSelect: false
    }
  },

  async created() {
    const numbers = await this._fetchNumbers()
    for (const num of numbers) {
      this.numbers.push({
        label: num,
        value: num
      })
    }

    const clients = await this._fetchClientsNames()
    for (const client of clients) {
      this.clients.push({
        label: client,
        value: client
      })
    }

    const goods = await this._fetchGoods()
    for (const good of goods) {
      this.goods.push({
        label: good.name,
        value: good.guid
      })
    }

    this.statuses = getStatusFilters(this.$t)

    this.filterNumber = this.$store.state.requests.filters.numbers
    const periodFrom = this.$store.state.requests.filters.periodFrom
    const periodTo = this.$store.state.requests.filters.periodTo
    if (periodFrom && periodTo) {
      this.filterPeriod = [periodFrom, periodTo]
    }
    this.filterClient = this.$store.state.requests.filters.clients
  },

  computed: {
    searchSet: function() {
      return this.filterNumber.length > 0
        || !!this.filterPeriod
        || this.filterClient.length > 0
        || this.filterGoods.length > 0
        || this.$store.state.requests.filters.pointsFrom.length > 0
        || this.$store.state.requests.filters.pointsTo.length > 0
        || this.filterStatus.length > 0
    }
  },

  methods: {
    async _fetchNumbers() {
      const { status, items } = await API.requests.filterNumbers(this)
      return status ? items : []
    },
    async _fetchClientsNames() {
      const { status, items } = await API.requests.filterClientsNames(this)
      return status ? items : []
    },
    async _fetchGoods() {
      const { status, items } = await API.requests.filterGoods(this)
      return status ? items : []
    },
    setSearch: function() {
      this.$store.dispatch('requests/setSearch', this.search)
    },
    setFilterNumber: function() {
      this.$store.dispatch('requests/setFilterNumber', this.filterNumber)
    },
    setFilterPeriod: function() {
      this.$store.dispatch('requests/setFilterPeriod', this.filterPeriod)
    },
    setFilterClient: function() {
      this.$store.dispatch('requests/setFilterClient', this.filterClient)
    },
    setFilterGoods: function() {
      this.$store.dispatch('requests/setFilterGoods', this.filterGoods)
    },
    setFilterStatuses: function() {
      this.$store.dispatch('requests/setFilterStatuses', this.filterStatus)
    },
    selectPointsFrom: function(points) {
      console.log('POINTS: ', points);
      this.visiblePointsFromSelect = false
      const pointsFrom = []
      const filterPointsFrom = []
      for (const point of points) {
        pointsFrom.push(point.label)
        filterPointsFrom.push(point.id)
      }
      this.pointFrom = pointsFrom.join(', ')
      this.$store.dispatch('requests/setFilterPointsFrom', filterPointsFrom)
    },
    selectPointsTo: function(points) {
      this.visiblePointsToSelect = false
      const pointsTo = []
      const filterPointsTo = []
      for (const point of points) {
        pointsTo.push(point.label)
        filterPointsTo.push(point.id)
      }
      this.pointTo = pointsTo.join(', ')
      this.$store.dispatch('requests/setFilterPointsTo', filterPointsTo)
    }
  }
}
</script>

<style lang="scss" scoped>
.th-list-toolbar-left {
  display: flex;
  flex-direction: row;

  .th-list-toolbar-search {
    margin-right: 10px;
  }
}

@media only screen and (max-width: 600px) {
  .th-list-toolbar-left {
    display: flex;
    flex-direction: column;

    .th-list-toolbar-search {
      width: 100%;
    }
  }
}
</style>

