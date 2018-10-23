<template>
  <div>
    <Toolbar>
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

          <Button v-show="!$_smallDeviceMixin_isDeviceSmall" type="" @click="rightViewVisible = !rightViewVisible">
            <fa icon="filter" />
            <span>{{ `${$t('lists.filter')}${searchSet ? ': ' + $t('lists.set') : ''}` }}</span>
          </Button>
        </div>
      </div>

      <div slot="right">
        <Button v-show="!$_smallDeviceMixin_isDeviceSmall" type="primary">{{ $t('lists.createNewRequests') }}</Button>
        <el-dropdown size="mini" v-show="$_smallDeviceMixin_isDeviceSmall">
          <Button type="">
            <fa icon="bars" />
          </Button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-show="$_smallDeviceMixin_isDeviceSmall">
              <span>{{ $t('lists.createNewRequests') }}</span>
            </el-dropdown-item>

            <el-dropdown-item divided v-show="$_smallDeviceMixin_isDeviceSmall">
              <span @click="rightViewVisible = !rightViewVisible">
                <span>{{ `${$t('lists.filter')}${searchSet ? ': ' + $t('lists.set') : ''}` }}</span>
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </Toolbar>

    <RightView
      :visible="rightViewVisible"
      :title="$t('lists.filterRequests')"
      @close="rightViewVisible = false">
      <Button
        type="text"
        size="mini"
        :disabled="!searchSet"
        style="margin-bottom: 15px"
        @click="clearFilters">
        {{ $t('lists.filters.clear') }}
      </Button>

      <el-form
        ref="form"
        label-width="120px"
        label-position="top"
        size="mini"
        @submit.native.prevent>
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
    </RightView>

    <PointSelect
      :visible="visiblePointsFromSelect"
      @close="visiblePointsFromSelect = false"
      @select="selectPointsFrom"/>
    <PointSelect
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

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    Toolbar,
    RightView,
    Button,
    PointSelect
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

      pointFrom: '',
      pointTo: '',

      rightViewVisible: false,


      pickerOptions: {
        firstDayOfWeek: 1
      },

      visiblePointsFromSelect: false,
      visiblePointsToSelect: false
    }
  },

  async created() {
    const setFilter = (key, list) => {
      for (const item of list) {
        this[key].push({
          label: item,
          value: item
        })
      }
    }

    try {
      const [ numbers, clients, goods ] = await Promise.all([
        this._fetchNumbers(),
        this._fetchClientsNames(),
        this._fetchGoods()
      ])

      setFilter('numbers', numbers)
      setFilter('clients', clients)

      for (const good of goods) {
        this.goods.push({
          label: good.name,
          value: good.guid
        })
      }
    } catch (e) {
      console.error(e);
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
      const { status, items } = await this.$api.requests.filterNumbers()
      return status ? items : []
    },
    async _fetchClientsNames() {
      const { status, items } = await this.$api.requests.filterClientsNames()
      return status ? items : []
    },
    async _fetchGoods() {
      const { status, items } = await this.$api.requests.filterGoods()
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
    },
    clearFilters() {
      this.filterNumber = []
      this.filterPeriod = null
      this.filterClient = []
      this.filterGoods = []
      this.filterStatus = []
      this.pointFrom = ''
      this.pointTo = ''

      this.$store.dispatch('requests/clearFilters')
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

