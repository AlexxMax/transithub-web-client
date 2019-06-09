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
            :request-guid="request.guid"
            @go-to-edit-view="handleGoToEditView"
          />
        </SlideRight>

        <SlideRight v-if="currentView === VIEWS.EDIT">
          <EditView
            :rows="rows"
            :request="request"
            :row-validation-method="rowIsValid"
            @drop-on-row="handleAddOnRow"
            @open-vehicle="handleOpenVehicle"
            @open-driver="handleOpenDriver"
            @delete-card="handleDeleteCard"
            @delete-row="handleDeleteRow"
            @ready-row="handleSetRowReady"
            @select="handleSelect"
          />
        </SlideRight>
      </div>

      <div slot="footer" class="VehiclesRegistersGenerationForm__footer">
        <Button
          round
          type="primary"
        >
          {{ $t('forms.common.generateVehiclesRegister') }}
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
import { showErrorMessage } from '@/utils/messages'

const blankRow = {
  truck: null,
  trailer: null,
  driver: null,
  handleStatus: HANDLE_STATUSES.DASH,
  ready: false
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

    visible: false,
    currentView: VIEWS.LIST,

    loading: false,

    VIEWS
  }),

  computed: {
    title() {
      return this.$t('forms.request.titleDateNumber').replace('%1', this.request.number).replace('%2', this.request.scheduleDate)
    },

    trucks() {
      return this.$store.getters[`${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_GETTERS_KEYS.TRUCKS}`]
    },

    trailers() {
      return this.$store.getters[`${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_GETTERS_KEYS.TRAILERS}`]
    },

    vehiclesLoading() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].loading
    },

    drivers() {
      return this.$store.state[DRIVERS_STORE_MODULE_NAME].list
    },

    driversLoading() {
      return this.$store.state[DRIVERS_STORE_MODULE_NAME].loading
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
        ready: row.handleStatus === HANDLE_STATUSES.READY
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
        rowIndex: row.rowIndex
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
        rowIndex: maxRowIndex
      })
    },

    showOperationError() {
      showErrorMessage(this.$t('messages.cantDoOperation'))
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
        const oldData = row[type]
        const oldHandleStatus = row.handleStatus

        row[type] = data
        row.handleStatus = HANDLE_STATUSES.DASH

        if (!row.guid && !this.hasLastEmptyRow()) {
          this.addNewRow()
        }

        let success = true
        let guid = row.guid
        if (row.guid) {
          success = await this.changeRow(row)
        } else {
          const { success: creationSuccess, guid: creationGuid } = await this.createRow(row)
          success = creationSuccess
          guid = creationGuid
        }
        if (success) {
          row.guid = guid
          console.log("TCL: handleAddOnRow -> row", row.guid)
        } else {
          row[type] = oldData
          row.handleStatus = oldHandleStatus
          this.showOperationError()

          if (!row.guid) {
            this.rows.splice(this.rows.length - 1, 1)
          }
        }
      }
    },

    async handleDeleteCard(type, row) {
      const oldData = row[type]
      const oldHandleStatus = row.handleStatus

      row[type] = null
      row.handleStatus = HANDLE_STATUSES.DASH

      const success = await this.changeRow(row)
      if (!success) {
        row[type] = oldData
        row.handleStatus = oldHandleStatus
        this.showOperationError()
      }

      if (!row.truck && !row.trailer && !row.driver) { // delete row, if it is blank
        this.handleDeleteRow(row)
      }
    },

    async handleDeleteRow(row) {
      const oldHandleStatus = row.handleStatus

      row.handleStatus = HANDLE_STATUSES.CANCELED

      const lastIndex = this.rows.length - 1
      const currentIndex = this.rows.indexOf(row)
      if (lastIndex !== currentIndex) {
        this.rows.splice(currentIndex, 1)
      }

      const success = await this.changeRow(row)
      if (!success) {
        this.rows.splice(currentIndex, 0, row)
        row.handleStatus = oldHandleStatus
        this.showOperationError()
      }
    },

    async handleSetRowReady(ready, row) {
      const oldHandleStatus = row.handleStatus

      row.handleStatus = ready ? HANDLE_STATUSES.READY : HANDLE_STATUSES.DASH

      const success = await this.changeRow(row)
      if (!success) {
        row.handleStatus = oldHandleStatus
        this.showOperationError()
      }

      row.ready = row.handleStatus === HANDLE_STATUSES.READY
    },

    handleSelect() {

    }
  },

  watch: {
    async visible() {
      if (this.visible) {
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
