<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.races')"
      store-module="races"
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

      <ListWrapper :loading="$store.state.races.loading">
        <ListHeader :cols="cols" :sort="sort" :big-margin="view === VIEWS.grouped"/>

        <ItemsWrapper>
          <ListItem
            v-show="view === VIEWS.default"
            v-for="r of races"
            :key="r.guid"
            :row="r.guid"
            :data="generateListItemData(r)"
            @onClick="openRace">
          </ListItem>

          <ListItemGroupe
            v-show="view === VIEWS.grouped"
            v-for="r of racesGrouped"
            :key="r.guid"
            :title="`${$t('forms.request.title')} №${r.number}`"
            :subtitle="r.scheduleDate"
            :value="r.guid"
            :count="r.races.length"
            @onClick="openRequest(r.guid)">

            <ListItemGroupe
              v-show="view === VIEWS.grouped"
              v-for="vr of r.vehiclesRegisters"
              :key="vr.guid"
              :title="$t('forms.vehicleRegister.title')"
              :subtitle="`${vr.dateFrom} - ${vr.dateTo}`"
              :value="vr.guid"
              :count="vr.races.length"
              @onClick="openVehiclesRegister(vr.guid)">
              <ListItem
                v-for="vrr of vr.races"
                :key="vrr.guid"
                :row="vrr.guid"
                :data="generateListItemData(vrr)"
                @onClick="openRace">
              </ListItem>
            </ListItemGroupe>

            <ListItem
              v-for="vr of r.racesWithoutVehiclesRegister"
              :key="vr.guid"
              :row="vr.guid"
              :data="generateListItemData(vr)"
              @onClick="openRace">
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
import FilterMenu from '@/components/Races/FilterMenu'

import { VIEWS } from '@/utils/vehiclesRegisters'
import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: "th-races-list",

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
    count() {
      return this.$store.state.races.count
    },
    filterSet: function() {
      return this.$store.getters['races/listFiltersSet']
    },
    cols() {
      return [{
        col: 'number',
        width: 3,
        title: this.$t('lists.number'),
        sort: true
      }, {
        col: 'date',
        width: 2,
        title: this.$t('lists.date'),
        sort: true
      }, {
        col: 'driver',
        width: this.view === VIEWS.default ? 4 : 5,
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
        width: 4,
        title: this.$t('lists.route')
      }, {
        col: "lastEvent",
        width: 4,
        title: this.$t('lists.lastEvent')
      }, {
        col: 'more',
        width: this.view === VIEWS.default ? 1 : 0,
        title: ''
      }]
    },
    view() {
      return this.$store.state.userSettings.races.list.view
    },
    races() {
      return this.$store.state.races.list
    },
    racesGrouped() {
      return this.$store.getters['races/groupedList']
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch")
    },
    setSearch: function(value) {
      this.$store.dispatch('races/setSearch', value)
    },
    sort: function(direction, col) {
      if (col === 'date') {
        this.$store.dispatch('races/setSortingDate', direction)
      }
    },
    handleListViewChange(value) {
      this.$store.commit('userSettings/SET_RACES_LIST_VIEW', value)
    },
    generateListItemData(r) {
      const number = {
        name: 'number',
        widthXs: 24,
        widthMd: 3,
        title: this.$t('lists.number') + ': ',
        value: r.number,
        subValue: this.$t(r.status.localeKey),
        subValueStyle: {
          'font-size': '13px',
          'color': r.status.color,
          'font-weight': '500'
        },
        primary: true,
        status: true
      }

      const date = {
        name: 'date',
        widthXs: 24,
        widthMd: 2,
        title: this.$t('lists.date') + ': ',
        value: r.date
      }

      const driver = {
        name: 'driver',
        widthXs: 24,
        widthMd: this.view === VIEWS.default ? 4 : 5,
        title: this.$t('lists.driver') + ': ',
        value: r.driverFullname,
        valueStyle: { 'text-transform': 'capitalize' },
        subValue: r.phone,
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
        value: r.vehicleNumber
      }

      const trailer = {
        name: 'trailer',
        widthXs: 24,
        widthMd: 3,
        title: this.$t('lists.trailerNumber') + ': ',
        value: r.trailerNumber
      }

      const route = {
        name: 'route',
        widthXs: 24,
        widthMd: 4,
        title: this.$t('lists.route') + ': ',
        value: (() => {
          if (r.pointFromName || r.pointToName) {
            return `${r.pointFromName} \u2192 ${r.pointToName}`
          }
          return ''
        }) ()
      }

      const lastEvent = {
        name: 'lastEvent',
        widthXs: 24,
        widthMd: 4,
        title: this.$t('lists.lastEvent') + ': ',
        value: (() => {
          if (r.lastEvent && r.lastEventDate) {
            return `${r.lastEvent} ${this.$t('general.in')} ${r.lastEventDate}`
          } else if (r.lastEvent && !r.lastEventDate) {
            return r.lastEventDate
          }
          return r.lastEvent
        }) ()
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
            this.openRequest(r.requestGuid)
          }
        }
      }

      if (r.vehiclesRegisterGuid) {
        more.menuItems.push({
          title: this.$t('lists.openVehiclesRegister'),
          command: 'openVehiclesRegister'
        })
        more.menuCommands.openVehiclesRegister = () => {
          this.openVehiclesRegister(r.vehiclesRegisterGuid)
        }
      }

      return [ number, date, driver, vehicle, trailer, route, lastEvent, more ]
    },
    openRace(colName, colValue, row) {
      this.$router.push(`/workspace/races/${row}`)
    },
    openRequest(requestGuid) {
      this.$router.push(`/workspace/requests/${requestGuid}`)
    },
    openVehiclesRegister(vehiclesRegisterGuid) {
      this.$router.push(`/workspace/vehicles-registers/${vehiclesRegisterGuid}`)
    }
  },

  created() {
    this.VIEWS = VIEWS
  }
}
</script>
