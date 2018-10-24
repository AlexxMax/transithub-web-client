<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.vehiclesRegisters')"
      store-module="vehiclesRegisters"
      @eventFetch="_fetch">
      <Toolbar
        slot="toolbar"
        ref="toolbar"
        :filterSet="filterSet"
        @showFilter="showFilters = !showFilters"
        @onSearch="setSearch">
        <ButtonsGroup slot="items">
          <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>
          <GroupsMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>
        </ButtonsGroup>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
          <GroupsMenu flat @close="closeToolbar"/>
        </div>
      </Toolbar>

      <ListWrapper :loading="$store.state.vehiclesRegisters.loading">
        <ListHeader :cols="cols" :sort="sort" :big-margin="grouped"/>

        <ItemsWrapper>
          <div v-if="grouped">
            <ListItemGroupe
              v-for="r of groupedList"
              :key="r.group"
              :title="r.group"
              :value="r.group"
              :count="r.items.length">
              <ListItem
                v-for="vr of r.items"
                :key="vr.guid"
                :row="vr.guid"
                :data="generateListItemData(vr)"
                @onClick="openVehiclesRegister">
              </ListItem>
            </ListItemGroupe>
          </div>

          <div v-else>
            <ListItem
              v-for="vr of list"
              :key="vr.guid"
              :row="vr.guid"
              :data="generateListItemData(vr)"
              @onClick="openVehiclesRegister">
            </ListItem>
          </div>
        </ItemsWrapper>
      </ListWrapper>
    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List"
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ListHeader from '@/components/Common/Lists/Header'
import ListItem from '@/components/Common/Lists/Item'
import ListItemGroupe from '@/components/Common/Lists/ItemGroupe'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import Toolbar from '@/components/Common/Lists/Toolbar'
import FilterMenu from '@/components/VehiclesRegisters/FilterMenu'
import GroupsMenu from '@/components/VehiclesRegisters/GroupsMenu'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicles-registers-list',

  mixins: [screen(SCREEN_TRIGGER_SIZES.list)],

  components: {
    CommonList,
    Button,
    ButtonsGroup,
    Toolbar,
    ListWrapper,
    ListHeader,
    ListItem,
    ListItemGroupe,
    ItemsWrapper,
    FilterMenu,
    GroupsMenu
  },

  props: {
    list: Array,
    groupedList: Array,
    grouped: Boolean
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
        width: !this.grouped ? 5 : 6,
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
        width: !this.grouped ? 1 : 0,
        title: ''
      }]
    },
    count: function() {
      return this.$store.state.vehiclesRegisters.count
    },
    filterSet: function() {
      return this.$store.getters['vehiclesRegisters/listFiltersSet']
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
        widthMd: !this.grouped ? 5 : 6,
        title: this.$t('lists.driver') + ': ',
        value: vr.driverFullname
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
        widthMd: !this.grouped ? 1 : 0,
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
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    }
  }
}
</script>
