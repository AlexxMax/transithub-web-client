<template>
  <div>

    <RightView
      visible
      :loading="loading"
      :title="title"
      :show-footer="currentView === VIEWS.EDIT"
      width="74%"
      @close="hide()"
    >

      <div>
        <SlideRight v-if="currentView === VIEWS.LIST">
          <ListView
            :request="request"
            @go-to-edit-view="handleGoToEditView"
          />
        </SlideRight>

        <SlideRight v-if="currentView === VIEWS.EDIT">
          <EditView
            ref="edit-view"
            :rows="rows"
            :request="request"
            :row-validation-method="rowIsValid"
            @drop-on-row="handleAddOnRow"
            @open-vehicle="handleOpenVehicle"
            @open-driver="handleOpenDriver"
            @delete-card="handleDeleteCard"
            @delete-row="handleDeleteRow"
            @ready-row="handleSetRowReady"
            @open-select="handleOpenSelect"
          />
        </SlideRight>
      </div>

      <div slot="footer" class="VehiclesRegistersGenerationForm__footer">
        <Button
          round
          :type="null"
          @click="hide"
        >
          {{ $t('forms.common.close') }}
        </Button>

        <Button
          :loading="loadingSendToCustomer"
          round
          type="primary"
          @click="handleSendToCustomer"
        >
          {{ $t('forms.common.sendToCustomer') }}
        </Button>
      </div>

    </RightView>

    <LeftView
      :title="$t('forms.common.select')"
      :visible="currentView === VIEWS.EDIT"
      width="23.5%"
      style="margin-left: -20px"
    >
      <Select
        :trucks="trucks"
        :trailers="trailers"
        :drivers="drivers"
        :trucks-loading="trucksLoading"
        :trailers-loading="trailersLoading"
        :drivers-loading="driversLoading"
        :trucks-show-load-more="trucksShowLoadMore"
        :trailers-show-load-more="trailersShowLoadMore"
        :drivers-show-load-more="driversShowLoadMore"
        :trucks-search="trucksSearch"
        :trailers-search="trailersSearch"
        :drivers-search="driversSearch"
        @open-vehicle="handleOpenVehicle"
        @open-driver="handleOpenDriver"
        @fetch-more-trucks="handleFetchMoreTrucks"
        @fetch-more-trailers="handleFetchMoreTrailers"
        @fetch-more-drivers="handleFetchMoreDrivers"
        @on-search-trucks="value => { trucksSearch = value }"
        @on-search-trailers="value => { trailersSearch = value }"
        @on-search-drivers="value => { driversSearch = value }"
      />
    </LeftView>

    <VehicleFastView
      ref="vehicle-fast-view"
      :vehicle="currentVehicle"
    />

    <DriverFastView
      ref="driver-fast-view"
      :driver="currentDriver"
    />

    <VehiclesSelectDialog
      ref="trucks-select-dialog"
      :title="$t('forms.common.vehiclesShort')"
      :items="trucks"
      :loading="trucksLoading"
      :show-load-more="trucksShowLoadMore"
      :search="trucksSearch"
      @item-open="handleOpenVehicle"
      @item-select="truck => handleSelect(truck, 'truck')"
      @fetch-more="handleFetchMoreTrucks"
      @on-search="value => { trucksSearch = value }"
    />

    <VehiclesSelectDialog
      ref="trailers-select-dialog"
      :title="$t('forms.common.trailers')"
      :items="trailers"
      :loading="trailersLoading"
      :show-load-more="trailersShowLoadMore"
      :search="trailersSearch"
      @item-open="handleOpenVehicle"
      @item-select="trailer => handleSelect(trailer, 'trailer')"
      @fetch-more="handleFetchMoreTrailers"
      @on-search="value => { trailersSearch = value }"
    />

    <DriversSelectDialog
      ref="drivers-select-dialog"
      :items="drivers"
      :loading="driversLoading"
      :show-load-more="driversShowLoadMore"
      :search="driversSearch"
      @item-open="handleOpenDriver"
      @item-select="driver => handleSelect(driver, 'driver')"
      @fetch-more="handleFetchMoreDrivers"
      @on-search="value => { driversSearch = value }"
    />

  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'
import LeftView from '@/components/Common/LeftView'
import SlideRight from '@/components/Common/Transitions/SlideRight'
import ListView from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormListView'
import EditView from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenetarionFormEditView'
import Select from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormSelect'
import VehicleFastView from '@/components/Vehicles/VehicleFastView'
import DriverFastView from '@/components/Drivers/DriverFastView'
import VehiclesSelectDialog from '@/components/Vehicles/VehiclesSelectDialog'
import DriversSelectDialog from '@/components/Drivers/DriversSelectDialog'

import {
  STORE_MODULE_NAME as VEHICLES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_ACTIONS_KEYS,
  MUTATIONS_KEYS as VEHICLES_MUTATIONS_KEYS
} from '@/utils/vehicles'

import {
  STORE_MODULE_NAME as DRIVERS_STORE_MODULE_NAME,
  ACTIONS_KEYS as DRIVERS_ACTIONS_KEYS,
  MUTATIONS_KEYS as DRIVERS_MUTATIONS_KEYS
} from '@/utils/drivers'

import { HANDLE_STATUSES } from '@/utils/vehiclesRegisters'
import { getErrorMessage } from '@/utils/errors'
import * as notify from '@/utils/notifications'
import generateStoreModuleListWithSearch from '@/utils/store/templates/listWithSearch'
import { LIST_TYPES } from '@/utils/vehicles'

const blankRow = {
  truck: null,
  trailer: null,
  driver: null,
  handleStatus: HANDLE_STATUSES.DASH,
  ready: false,
  changeable: true
}

const VIEWS = Object.freeze({
  LIST: 'LIST',
  EDIT: 'EDIT'
})

export default {
  name: 'th-vehicles-registers-generations-form',

  components: {
    Button,
    RightView,
    LeftView,
    SlideRight,
    ListView,
    EditView,
    Select,
    VehicleFastView,
    DriverFastView,
    VehiclesSelectDialog,
    DriversSelectDialog
  },

  props: {
    request: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    currentVehicle: {},
    currentDriver: {},
    rows: [],
    currentRow: null,
    currentView: VIEWS.LIST,
    loading: false,
    loadingSendToCustomer: false,

    VIEWS
  }),

  computed: {
    title() {
      return this.$t('forms.request.titleDateNumber').replace('%1', this.request.number).replace('%2', this.request.scheduleDate)
    },

    trucks() {
      if (this.$store.state[this.storeModuleNameTrucks]) {
        const trucks = this.$store.state[this.storeModuleNameTrucks].list
        return trucks.filter(truck => !this.usedTrucks.find(usedTruck => truck.guid === usedTruck))
      }
      return []
    },

    trailers() {
      if (this.$store.state[this.storeModuleNameTrailers]) {
        const trailers = this.$store.state[this.storeModuleNameTrailers].list
        return trailers.filter(trailer => !this.usedTrailers.find(usedTrailer => trailer.guid === usedTrailer))
      }
      return []
    },

    trucksLoading() {
      return this.$store.state[this.storeModuleNameTrucks]
        ? this.$store.state[this.storeModuleNameTrucks].loading
        : true
    },

    trailersLoading() {
      return this.$store.state[this.storeModuleNameTrailers]
        ? this.$store.state[this.storeModuleNameTrailers].loading
        : true
    },

    trucksShowLoadMore() {
      if (this.$store.state[this.storeModuleNameTrucks]) {
        const { count, list } = this.$store.state[this.storeModuleNameTrucks]
        return count > list.length
      }
      return false
    },

    trailersShowLoadMore() {
      if (this.$store.state[this.storeModuleNameTrailers]) {
        const { count, list } = this.$store.state[this.storeModuleNameTrailers]
        return count > list.length
      }
      return false
    },

    trucksSearch: {
      get() {
        return this.$store.state[this.storeModuleNameTrucks]
          ? this.$store.state[this.storeModuleNameTrucks].search
          : ''
      },
      async set(value) {
        if (this.storeModuleNameTrucks) {
          await this.$store.commit(`${this.storeModuleNameTrucks}/SET_SEARCH`, value)
        }
      }
    },

    trailersSearch: {
      get() {
        return this.$store.state[this.storeModuleNameTrailers]
          ? this.$store.state[this.storeModuleNameTrailers].search
          : ''
      },
      async set(value) {
        if (this.storeModuleNameTrailers) {
          await this.$store.commit(`${this.storeModuleNameTrailers}/SET_SEARCH`, value)
        }
      }
    },

    drivers() {
      if (this.$store.state[this.storeModuleNameDrivers]) {
        const drivers = this.$store.state[this.storeModuleNameDrivers].list
        return drivers.filter(driver => !this.usedDrivers.find(usedDriver => driver.guid === usedDriver))
      }
      return []
    },

    driversLoading() {
      return this.$store.state[this.storeModuleNameDrivers]
        ? this.$store.state[this.storeModuleNameDrivers].loading
        : true
    },

    driversShowLoadMore() {
      if (this.$store.state[this.storeModuleNameDrivers]) {
        const { count, list } = this.$store.state[this.storeModuleNameDrivers]
        return count > list.length
      }
      return false
    },

    driversSearch: {
      get() {
        return this.$store.state[this.storeModuleNameDrivers]
          ? this.$store.state[this.storeModuleNameDrivers].search
          : ''
      },
      async set(value) {
        if (this.$store.state[this.storeModuleNameDrivers]) {
          await this.$store.commit(`${this.storeModuleNameDrivers}/SET_SEARCH`, value)
        }
      }
    },

    usedDrivers() {
      return this.rows.filter(row => row.driver).map(row => row.driver.guid)
    },

    usedTrucks() {
      return this.rows.filter(row => row.truck).map(row => row.truck.guid)
    },

    usedTrailers() {
      return this.rows.filter(row => row.trailer).map(row => row.trailer.guid)
    }
  },

  methods:{

    hide() {
      this.$emit('close')
    },

    showRowUnchangeableDialog() {
      this.$alert(this.$t('messages.unableToChangeVehicleRegisterByDate'), this.$t('forms.common.alert'), {
        confirmButtonText: this.$t('forms.common.ok'),
        roundButton: true,
        zIndex: 4000
      })
        .then(() => {})
        .catch(() => {})
    },

    init() {
      this.currentVehicle = {}
      this.currentDriver = {}
      this.rows = []
      this.currentRow = null
      this.currentView = VIEWS.LIST
      this.loading = false
      this.loadingSendToCustomer = false
    },

    hasLastEmptyRow() {
      const emptyRow = this.rows[this.rows.length - 1]
      if (emptyRow) {
        return !emptyRow.truck && !emptyRow.driver && !emptyRow.trailer
      }
      return false
    },

    rowIsValid(row) {
      return !!row.truck && !!row.driver
    },

    async fetchTrucks() {
      if (this.$store.state[this.storeModuleNameTrucks]) {
        const { offset, limit } = this.$store.state[this.storeModuleNameTrucks]
        const args = [
          this.$store.state.companies.currentCompany.guid,
          limit,
          offset,
          {},
          this.trucksSearch,
          LIST_TYPES.TRUCK
        ]
        await this.$store.dispatch(`${this.storeModuleNameTrucks}/FETCH_LIST`, args)
      }

      // await this.$store.dispatch(
      //   `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.FETCH_TRUCKS_LIST}`,
      //   this.$store.state.companies.currentCompany.guid
      // )
    },

    async fetchTrailers() {
      if (this.$store.state[this.storeModuleNameTrailers]) {
        const { offset, limit } = this.$store.state[this.storeModuleNameTrailers]
        const args = [
          this.$store.state.companies.currentCompany.guid,
          limit,
          offset,
          {},
          this.trailersSearch,
          LIST_TYPES.TRAILER
        ]
        await this.$store.dispatch(`${this.storeModuleNameTrailers}/FETCH_LIST`, args)
      }

      // await this.$store.dispatch(
      //   `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.FETCH_TRAILERS_LIST}`,
      //   this.$store.state.companies.currentCompany.guid
      // )
    },

    async fetchDrivers() {
      if (this.$store.state[this.storeModuleNameDrivers]) {
        const { offset, limit } = this.$store.state[this.storeModuleNameDrivers]
        const args = [
          this.$store.state.companies.currentCompany.guid,
          limit,
          offset,
          {},
          this.driversSearch
        ]
        await this.$store.dispatch(`${this.storeModuleNameDrivers}/FETCH_LIST`, args)
      }


      // await this.$store.dispatch(
      //   `${DRIVERS_STORE_MODULE_NAME}/${DRIVERS_ACTIONS_KEYS.FETCH_LIST}`,
      //   this.$store.state.companies.currentCompany.guid
      // )
    },

    async fetch() {
      this.loading = true

      await Promise.all([
        this.fetchTrucks(),
        this.fetchTrailers(),
        this.fetchDrivers(),
        this.$store.dispatch('vehiclesRegisters/fetchSubordinateList', this.request.guid)
      ])

      let rows = this.$store.getters['vehiclesRegisters/getOutcomingSubordinateList'](this.request.guid)
      rows = rows.map(row => ({
        ...row,
        truck: row.truck || null,
        trailer: row.trailer || null,
        driver: row.driver || null,
        ready: row.handleStatus === HANDLE_STATUSES.READY,
        readyToSubscription: row.readyToSubscription,
        sentToClient: row.sentToClient,
        rowId: row.guid,
        changeable: row.changeable
      }))

      this.rows = [ ...rows ]
      this.addNewRow() // Add new blank row

      this.loading = false
    },

    generatePayload(row) {
      return {
        guid: row.guid,
        truck: row.truck ? row.truck.guid : null,
        trailer: row.trailer ? row.trailer.guid : null,
        driver: row.driver ? row.driver.guid : null,
        handleStatus: row.handleStatus,
        rowIndex: row.rowIndex,
        readyToSubscription: row.readyToSubscription
      }
    },

    async changeRow(row) {
      const { error, success } = await this.$store.dispatch(
        'vehiclesRegisters/changeSubordinateVehicleRegister',
        {
          vehicleRegister: this.generatePayload(row),
          requestGuid: this.request.guid
        }
      )

      if (error) {
        const message = getErrorMessage(this, error)
        notify.error(message)
      }

      return success
    },

    async createRow(row) {
      const { success, guid } = await this.$store.dispatch(
        'vehiclesRegisters/createSubordinateVehicleRegister',
        {
          vehicleRegister: this.generatePayload(row),
          requestGuid: this.request.guid
        }
      )

      return { success, guid }
    },

    addNewRow() {
      let maxRowIndex = Math.max.apply(Math, this.rows.map(row => row.rowIndex ))
      if (maxRowIndex === -Infinity) {
        maxRowIndex = 0
      } else {
        maxRowIndex++
      }

      this.rows.push({
        ...blankRow,
        rowIndex: maxRowIndex,
        rowId: `${new Date()}`
      })
    },

    showOperationError() {
      notify.error(this.$t('messages.cantDoOperation'))
    },

    checkVehicleByHeight(vehicle) {
      if (!vehicle) return

      if (this.request.warehouseFromMaxHeight && this.request.warehouseFromMaxHeight > 0) {
        if (vehicle.height && vehicle.height > 0) {
          if (vehicle.height > this.request.warehouseFromMaxHeight) {
            notify.warning(this.$t('messages.alertVehicleHeightMoreThenWarehouseHeight'))
          }
        } else {
          notify.warning(this.$t('messages.alertVehicleHasNoHeight'))
        }
      }
    },

    async addOnRow(data, type, row) {
      this.loading = true

      const oldData = row[type]
      const {
        trailer: oldTrailer,
        driver: oldDriver,
        handleStatus: oldHandleStatus,
        readyToSubscription: oldReadyToSubscription
      } = row

      row[type] = data
      row.handleStatus = HANDLE_STATUSES.DASH
      row.readyToSubscription = false

      if (type === 'truck' && data) {
        if (!row.trailer && data.lastTrailer) {
          row.trailer = data.lastTrailer
        }

        if (!row.driver && data.lastDriver) {
          row.driver = data.lastDriver
        }
      }

      if (type === 'truck' || type === 'trailer') {
        this.checkVehicleByHeight(data)
      }

      if (!row.guid && !this.hasLastEmptyRow()) {
        this.addNewRow()
      }

      let success = true
      let guid = row.guid
      if (row.guid) {
        if (row.sentToClient) {
          this.changeSentRow(row, oldHandleStatus, oldReadyToSubscription)
        } else {
          success = await this.changeRow(row)
        }
      } else {
        const { success: creationSuccess, guid: creationGuid } = await this.createRow(row)
        success = creationSuccess
        guid = creationGuid
      }
      if (success) {
        row.guid = guid
        row.rowId = guid
        row.ready = false
      } else {
        row[type] = oldData
        row.handleStatus = oldHandleStatus
        row.readyToSubscription = oldReadyToSubscription

        if (type === 'truck') {
          row.trailer = oldTrailer
          row.driver = oldDriver
        }

        this.showOperationError()

        if (!row.guid) {
          this.rows.splice(this.rows.length - 1, 1)
        }
      }

      if (!row.truck && !row.trailer && !row.driver) { // delete row, if it is blank
        this.handleDeleteRow(row)
      }

      this.loading = false
    },

    async changeSentRow(row, oldHandleStatus, oldReadyToSubscription) {
      // Cancel current row and use subscription
      row.handleStatus = HANDLE_STATUSES.CANCELED
      row.readyToSubscription = true

      const success = await this.changeRow(row)
      if (success) {
        const rowIndex = this.rows.indexOf(row)
        const { guid, sentToClient, ready, ...newRow } = row

        // Delete current row
        this.rows.splice(rowIndex, 1)

        // Copy current row without guid and set status to 'dash', and unsubscribe
        newRow.handleStatus = HANDLE_STATUSES.DASH
        newRow.readyToSubscription = false

        const { success: newRowSuccess, guid: newRowGuid } = await this.createRow(newRow)
        if (newRowSuccess) {
          this.rows.splice(rowIndex, 0, {
            ...newRow,
            guid: newRowGuid,
            rowId: newRowGuid,
            ready: false
          })
        } else {
          // Undo changes for parent row
          row.handleStatus = oldHandleStatus
          row.readyToSubscription = oldReadyToSubscription

          await this.changeRow(row)

          this.showOperationError()
        }

      } else {
        // Undo changes for current row
        row.handleStatus = oldHandleStatus
        row.readyToSubscription = oldReadyToSubscription
        this.showOperationError()
      }
    },

    handleGoToEditView() {
      this.currentView = VIEWS.EDIT
    },

    handleOpenVehicle(vehicle) {
      this.currentVehicle = vehicle
      this.$refs['vehicle-fast-view'].show()
    },

    handleOpenDriver(driver) {
      this.currentDriver = driver
      this.$refs['driver-fast-view'].show()
    },

    async handleAddOnRow(data, type, row) {
      if (type === data._type) {
        if (row.changeable) {
          await this.addOnRow(data, type, row)
        } else {
          this.showRowUnchangeableDialog()
        }
      }
    },

    async handleDeleteCard(type, row) {
      if (row.changeable) {
        await this.addOnRow(null, type, row)
      } else {
        this.showRowUnchangeableDialog()
      }
    },

    async handleDeleteRow(row) {
      if (row.changeable) {
        this.loading = true

        const oldHandleStatus = row.handleStatus
        const oldReadyToSubscription = row.readyToSubscription

        row.handleStatus = HANDLE_STATUSES.CANCELED
        row.readyToSubscription = oldHandleStatus === HANDLE_STATUSES.READY

        let _row = { ...row }

        const lastIndex = this.rows.length - 1
        const currentIndex = this.rows.indexOf(row)
        if (lastIndex !== currentIndex) {
          this.rows.splice(currentIndex, 1)
        }

        const success = await this.changeRow(_row)
        if (!success) {
          this.rows.splice(currentIndex, 0, _row)
          _row = this.rows[currentIndex]
          _row.handleStatus = oldHandleStatus
          _row.readyToSubscription = oldReadyToSubscription
          this.showOperationError()
        }

        this.loading = false
      } else {
        this.showRowUnchangeableDialog()
      }
    },

    async handleSetRowReady(ready, row) {
      if (row.changeable) {
        this.loading = true

        const oldHandleStatus = row.handleStatus
        const oldReadyToSubscription = row.readyToSubscription

        row.handleStatus = ready ? HANDLE_STATUSES.READY : HANDLE_STATUSES.DASH
        row.readyToSubscription = ready

        if (ready) {
          const success = await this.changeRow(row)
          if (!success) {
            row.handleStatus = oldHandleStatus
            row.readyToSubscription = oldReadyToSubscription
            this.showOperationError()
          }
        } else {
          if (row.sentToClient) {
            this.changeSentRow(row, oldHandleStatus, oldReadyToSubscription)
          } else {
            const success = await this.changeRow(row)
            if (!success) {
              row.handleStatus = oldHandleStatus
              row.readyToSubscription = oldReadyToSubscription
              this.showOperationError()
            }
          }
        }

        row.ready = row.handleStatus === HANDLE_STATUSES.READY

        this.loading = false
      } else {
        this.showRowUnchangeableDialog()
      }
    },

    async handleSelect(data, type) {
      if (type === 'truck') {
        this.$refs['trucks-select-dialog'].hide()
      } else if (type === 'trailer') {
        this.$refs['trailers-select-dialog'].hide()
      } else if (type === 'driver') {
        this.$refs['drivers-select-dialog'].hide()
      }

      await this.addOnRow(data, type, this.currentRow)
    },

    handleOpenSelect(type, row) {
      if (row.changeable) {
        this.currentRow = row
        if (type === 'truck') {
          this.$refs['trucks-select-dialog'].show()
        } else if (type === 'trailer') {
          this.$refs['trailers-select-dialog'].show()
        } else if (type === 'driver') {
          this.$refs['drivers-select-dialog'].show()
        }
      } else {
        this.showRowUnchangeableDialog()
      }
    },

    async handleSendToCustomer() {
      this.loadingSendToCustomer = true

      const { status, requestVehiclesRegisterStatus } = await this.$api.vehiclesRegisters.subscribeVehicleRegister(this.request.guid)
      if (status) {
        this.$store.commit('requests/SET_REQUEST_VEHICLES_REGISTER_STATUS', {
          guid: this.request.guid,
          requestVehiclesRegisterStatus
        })
        notify.success(this.$t('messages.vehicleRegisterSendToClient'))
      } else {
        notify.error(this.$t('messages.сouldNotSendVehicleRegisterToTheClient'))
      }

      this.loadingSendToCustomer = false

      this.hide()
    },

    async handleFetchMoreTrucks() {
      if (this.$store.state[this.storeModuleNameTrucks]) {
        const { offset, limit } = this.$store.state[this.storeModuleNameTrucks]
        this.$store.commit(`${this.storeModuleNameTrucks}/SET_OFFSET`, offset + limit)
        await this.fetchTrucks()
      }
    },

    async handleFetchMoreTrailers() {
      if (this.$store.state[this.storeModuleNameTrailers]) {
        const { offset, limit } = this.$store.state[this.storeModuleNameTrailers]
        this.$store.commit(`${this.storeModuleNameTrailers}/SET_OFFSET`, offset + limit)
        await this.fetchTrailers()
      }
    },

    async handleFetchMoreDrivers() {
      if (this.$store.state[this.storeModuleNameDrivers]) {
        let { offset, limit } = this.$store.state[this.storeModuleNameDrivers]
        this.$store.commit(`${this.storeModuleNameDrivers}/SET_OFFSET`, offset + limit)
        await this.fetchDrivers()
      }
    },

    registerListModule(name, apiCall) {
      if (!this.$store.state[name]) {
        const rawModule = generateStoreModuleListWithSearch(apiCall)
        this.$store.registerModule(name, rawModule, { preserveState: false })
      }
    },

    mountState() {
      this.storeModuleNameTrucks = 'vehiclesRegistersGeneration_trucksList'
      this.registerListModule(this.storeModuleNameTrucks, this.$api.vehicles.getVehicles)

      this.storeModuleNameTrailers = 'vehiclesRegistersGeneration_trailersList'
      this.registerListModule(this.storeModuleNameTrailers, this.$api.vehicles.getVehicles)

      this.storeModuleNameDrivers = 'vehiclesRegistersGeneration_drivers'
      this.registerListModule(this.storeModuleNameDrivers, this.$api.drivers.getDrivers)
    },

    unmountState() {
      this.$store.unregisterModule(this.storeModuleNameTrucks)
      this.$store.unregisterModule(this.storeModuleNameTrailers)
      this.$store.unregisterModule(this.storeModuleNameDrivers)
    },
  },

  watch: {
    trucksSearch: {
      immediate: false,
      handler: async function () {
        await this.fetchTrucks()
      },
    },

    trailersSearch: {
      immediate: false,
      handler: async function () {
        await this.fetchTrailers()
      },
    },

    driversSearch: {
      immediate: false,
      handler: async function () {
        await this.fetchDrivers()
      },
    },
  },

  async mounted() {
    this.mountState()
    this.init()
    await this.fetch()
  },

  beforeDestroy() {
    this.unmountState()
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationForm {
  &__left-view {
    margin-left: -25px;
  }

  &__footer {
    text-align: center;
  }
}
</style>
