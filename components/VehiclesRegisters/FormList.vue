<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.vehiclesRegisters')"
      store-module="vehiclesRegisters"
      @eventFetch="_fetch">
      <Toolbar
        slot="toolbar"
        :filterSet="filterSet"
        @showFilter="showFilters = !showFilters"
        @onSearch="setSearch">
        <div slot="left">
          <el-button-group v-show="!$_smallDeviceMixin_isDeviceSmall" style="display: flex; flex-direction: row; margin-left: 10px">
            <Button
              :type="view === VIEWS.default ? 'primary' : ''"
              size="small"
              @click="handleListViewChange(VIEWS.default)">
              {{ $t('lists.groups.default') }}
            </Button>
            <Button
              :type="view === VIEWS.grouped ? 'primary' : ''"
              size="small"
              @click="handleListViewChange(VIEWS.grouped)">
              {{ $t('lists.groups.grouped') }}
            </Button>
          </el-button-group>
        </div>

        <el-dropdown-item
          divided
          slot="right-menu-item-0"
          v-show="$_smallDeviceMixin_isDeviceSmall">
          <span
            @click="handleListViewChange(VIEWS.default)"
            :style="{ 'color': view === VIEWS.default ? '#FECD34' : 'inherit' }">
            {{ $t('lists.groups.default') }}
          </span>
        </el-dropdown-item>
        <el-dropdown-item
          slot="right-menu-item-1"
          v-show="$_smallDeviceMixin_isDeviceSmall">
          <span
            @click="handleListViewChange(VIEWS.grouped)"
            :style="{ 'color': view === VIEWS.grouped ? '#FECD34' : 'inherit' }">
            {{ $t('lists.groups.grouped') }}
          </span>
        </el-dropdown-item>
      </Toolbar>

      <ListWrapper :loading="$store.state.vehiclesRegisters.loading">
        <ListHeader :cols="cols" :sort="sort" :big-margin="view === VIEWS.grouped"/>

        <ItemsWrapper>
          <ListItem
            v-show="view === VIEWS.default"
            v-for="vr of vehiclesRegisters"
            :key="vr.guid"
            :row="vr.guid"
            :data="generateListItemData(vr)"
            @onClick="openVehiclesRegister">
          </ListItem>

          <ListItemGroupe
            v-show="view === VIEWS.grouped"
            v-for="r of vehiclesRegistersGrouped"
            :key="r.guid"
            :title="`${$t('forms.request.title')} №${r.number}`"
            :subtitle="r.scheduleDate"
            :value="r.guid"
            :count="r.items.length"
            @onClick="openRequest(r.guid)">
            <ListItem
              v-for="vr of r.items"
              :key="vr.guid"
              :row="vr.guid"
              :data="generateListItemData(vr)"
              @onClick="openVehiclesRegister">
            </ListItem>
          </ListItemGroupe>
        </ItemsWrapper>
      </ListWrapper>
    </CommonList>

    <FilterMenu
      :visible="showFilters"
      @close="showFilters = false"/>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List"
import Button from '@/components/Common/Buttons/Button'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ListHeader from '@/components/Common/Lists/Header'
import ListItem from '@/components/Common/Lists/Item'
import ListItemGroupe from '@/components/Common/Lists/ItemGroupe'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import Toolbar from '@/components/Common/Lists/Toolbar'
import FilterMenu from '@/components/VehiclesRegisters/FilterMenu'

import { VIEWS } from '@/utils/vehiclesRegisters'
import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicles-registers-list',

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    Button,
    Toolbar,
    ListWrapper,
    ListHeader,
    ListItem,
    ListItemGroupe,
    ItemsWrapper,
    FilterMenu
  },

  data() {
    return {
      showFilters: false
    };
  },

  computed: {
    cols() {
      return [{
        col: 'status',
        width: 2,
        title: this.$t('lists.status')
      }, {
        col: 'period',
        width: 3,
        title: this.$t('lists.period'),
        sort: true
      }, {
        col: 'driver',
        width: this.view === VIEWS.default ? 5 : 6,
        title: this.$t('lists.driver')
      }, {
        col: 'vehicleNumber',
        width: 3,
        title: this.$t('lists.vehicleNumber')
      }, {
        col: 'trailerNumber',
        width: 3,
        title: this.$t('lists.trailerNumber')
      }, {
        col: 'route',
        width: 5,
        title: this.$t('lists.route')
      }, {
        col: 'quantityRace',
        width: 2,
        title: this.$t('lists.quantityRace')
      }, {
        col: 'more',
        width: this.view === VIEWS.default ? 1 : 0,
        title: ''
      }]
    },
    vehiclesRegisters: function() {
      return this.$store.state.vehiclesRegisters.list.slice()
    },
    vehiclesRegistersGrouped() {
      return this.$store.getters['vehiclesRegisters/groupedList']
    },
    count: function() {
      return this.$store.state.vehiclesRegisters.count
    },
    filterSet: function() {
      return this.$store.getters['vehiclesRegisters/listFiltersSet']
    },
    view() {
      return this.$store.state.userSettings.vehiclesRegisters.list.view
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch")
    },
    sort: function(direction, col) {
      if (col === 'period') {
        this.$store.dispatch('vehiclesRegisters/setSortingDate', direction)
      }
    },
    setSearch: function(value) {
      this.$store.dispatch('vehiclesRegisters/setSearch', value)
    },
    openVehiclesRegister: function(colName, colData, row) {
      if (colName !== 'more') {
        this.$router.push(`/workspace/vehicles-registers/${row}`)
      }
    },
    handleListViewChange(value) {
      this.$store.commit('userSettings/SET_VEHICLES_REGISTERS_LIST_VIEW', value)
    },
    generateListItemData(vr) {
      const status = {
        name: 'status',
        widthXs: 24,
        widthMd: 2,
        title: this.$t('lists.status') + ': ',
        value: this.$t(vr.status.localeKey),
        valueStyle: {
          'color': vr.status.color,
          'font-weight': '500'
        },
        status: true
      }

      const period = {
        name: 'period',
        widthXs: 24,
        widthMd: 3,
        title: this.$t('lists.period') + ': ',
        value: vr.periodFrom,
        subValue: vr.periodTo
      }

      const driver = {
        name: 'driver',
        widthXs: 24,
        widthMd: this.view === VIEWS.default ? 5 : 6,
        title: this.$t('lists.driver') + ': ',
        value: vr.driverFullname,
        subValue: vr.phone,
        subValueStyle: {
          'font-size': '13px',
          'font-weight': '500'
        }
      }

      const vehicle = {
        name: 'vehicle',
        widthXs: 24,
        widthMd: 3,
        title: this.$t('lists.vehicleNumber') + ': ',
        value: vr.vehicleNumber
      }

      const trailer = {
        name: 'trailer',
        widthXs: 24,
        widthMd: 3,
        title: this.$t('lists.trailerNumber') + ': ',
        value: vr.trailerNumber
      }

      const route = {
        name: 'route',
        widthXs: 24,
        widthMd: 5,
        title: this.$t('lists.route') + ': ',
        value: (() => {
          if (vr.pointFrom || vr.pointTo) {
            return `${vr.pointFrom} \u2192 ${vr.pointTo}`
          }
          return ''
        }) ()
      }

      const trips = {
        name: 'trips',
        widthXs: 24,
        widthMd: 2,
        title: this.$t('lists.quantityRace') + ': ',
        value: vr.tripsQuantity
      }

      const more = {
        name: 'more',
        widthXs: 24,
        widthMd: this.view === VIEWS.default ? 1 : 0,
        title: this.$t('lists.moreMenu'),
        value: this.$t('lists.moreMenu'),
        menu: true,
        menuItems: [{
          title: this.$t('lists.openRequest'),
          command: 'openRequest'
        }],
        menuCommands: {
          openRequest: () => {
            this.openRequest(vr.requestGuid)
          }
        }
      }

      return [ status, period, driver, vehicle, trailer, route, trips, more ]
    },
    openRequest(requestGuid) {
      this.$router.push(`/workspace/requests/${requestGuid}`)
    }
  },

  created() {
    this.VIEWS = VIEWS
  }
}
</script>
