<template>
  <div>

    <RightView
      :loading="loading"
      :title="title"
      :visible="visible"
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
        :vehicles-loading="vehiclesLoading"
        :drivers-loading="driversLoading"
        @open-vehicle="handleOpenVehicle"
        @open-driver="handleOpenDriver"
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
      :loading="vehiclesLoading"
      @item-open="handleOpenVehicle"
      @item-select="truck => handleSelect(truck, 'truck')"
    />

    <VehiclesSelectDialog
      ref="trailers-select-dialog"
      :title="$t('forms.common.trailers')"
      :items="trailers"
      :loading="vehiclesLoading"
      @item-open="handleOpenVehicle"
      @item-select="trailer => handleSelect(trailer, 'trailer')"
    />

    <DriversSelectDialog
      ref="drivers-select-dialog"
      :items="drivers"
      :loading="driversLoading"
      @item-open="handleOpenDriver"
      @item-select="driver => handleSelect(driver, 'driver')"
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
  GETTERS_KEYS as VEHICLES_GETTERS_KEYS
} from '@/utils/vehicles'

import {
  STORE_MODULE_NAME as DRIVERS_STORE_MODULE_NAME,
  ACTIONS_KEYS as DRIVERS_ACTIONS_KEYS
} from '@/utils/drivers'

import { HANDLE_STATUSES } from '@/utils/vehiclesRegisters'
import { getErrorMessage } from '@/utils/errors'
import { showErrorMessage, showSuccessMessage } from '@/utils/messages'

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

    visible: false,
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
      const trucks = this.$store.getters[`${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_GETTERS_KEYS.TRUCKS}`]
      return trucks.filter(truck => !this.usedTrucks.find(usedTruck => truck.guid === usedTruck))
    },

    trailers() {
      const trailers = this.$store.getters[`${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_GETTERS_KEYS.TRAILERS}`]
      return trailers.filter(trailer => !this.usedTrailers.find(usedTrailer => trailer.guid === usedTrailer))
    },

    vehiclesLoading() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].loading
    },

    drivers() {
      const drivers = this.$store.state[DRIVERS_STORE_MODULE_NAME].list
      return drivers.filter(driver => !this.usedDrivers.find(usedDriver => driver.guid === usedDriver))
    },

    driversLoading() {
      return this.$store.state[DRIVERS_STORE_MODULE_NAME].loading
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
    show() {
      this.visible = true
    },

    hide() {
      this.currentView = VIEWS.LIST
      this.visible = false
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

    async fetch() {
      this.loading = true

      await Promise.all([
        this.$store.dispatch(
          `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.FETCH_LIST}`,
          this.$store.state.companies.currentCompany.guid
        ),
        this.$store.dispatch(
          `${DRIVERS_STORE_MODULE_NAME}/${DRIVERS_ACTIONS_KEYS.FETCH_LIST}`,
          this.$store.state.companies.currentCompany.guid
        ),
        this.$store.dispatch('vehiclesRegisters/fetchSubordinateList', this.request.guid)
      ])

      let rows = this.$store.getters['vehiclesRegisters/getOutcomingSubordinateList'](this.request.guid)

      const populateRowItem = (guid, table) => table.find(item => item.guid === guid)

      rows = rows.map(row => ({
        ...row,
        truck: populateRowItem(row.truck, this.trucks) || null,
        trailer: populateRowItem(row.trailer, this.trailers) || null,
        driver: populateRowItem(row.driver, this.drivers) || null,
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
        showErrorMessage(message)
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
      showErrorMessage(this.$t('messages.cantDoOperation'))
    },

    checkVehicleByHeight(vehicle) {
      if (!vehicle) return

      if (this.request.warehouseFromMaxHeight && this.request.warehouseFromMaxHeight > 0) {
        if (vehicle.height && vehicle.height > 0) {
          if (vehicle.height > this.request.warehouseFromMaxHeight) {
            showErrorMessage(this.$t('messages.alertVehicleHeightMoreThenWarehouseHeight'))
          }
        } else {
          showErrorMessage(this.$t('messages.alertVehicleHasNoHeight'))
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
        showSuccessMessage(this.$t('messages.vehicleRegisterSendToClient'))
      } else {
        showErrorMessage(this.$t('messages.сouldNotSendVehicleRegisterToTheClient'))
      }

      this.loadingSendToCustomer = false

      this.hide()
    }
  },

  watch: {
    async visible() {
      if (this.visible) {
        this.init()
        await this.fetch()
      }
    }
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
