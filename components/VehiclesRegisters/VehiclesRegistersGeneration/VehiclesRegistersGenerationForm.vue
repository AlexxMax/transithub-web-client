<template>
  <div>

    <RightView
      :title="title"
      :visible="visible"
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
            :request="request"
            @open-vehicle="handleOpenVehicle"
            @open-driver="handleOpenDriver"
            @open-vehicles-list="handleOpenVehiclesList"
            @open-drivers-list="handleOpenDriversList"
          />
        </SlideRight>
      </div>

    </RightView>

    <LeftView
      :title="$t('forms.common.select')"
      :visible="currentView === VIEWS.EDIT"
      width="23.5%"
      style="margin-left: -25px"
    >
      <Select
        :vehicles="vehicles"
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
      ref="vehicles-select-dialog"
    />

    <DriversSelectDialog
      ref="drivers-select-dialog"
    />

  </div>
</template>

<script>
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
  ACTIONS_KEYS as VEHICLES_ACTIONS_KEYS
} from '@/utils/vehicles'

import {
  STORE_MODULE_NAME as DRIVERS_STORE_MODULE_NAME,
  ACTIONS_KEYS as DRIVERS_ACTIONS_KEYS
} from '@/utils/drivers'

const VIEWS = Object.freeze({
  LIST: 'LIST',
  EDIT: 'EDIT'
})

export default {
  name: 'th-vehicles-registers-generations-form',

  components: {
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
    items: [],

    visible: false,
    currentView: VIEWS.LIST,

    VIEWS
  }),

  computed: {
    title() {
      return this.$t('forms.request.titleDateNumber').replace('%1', this.request.number).replace('%2', this.request.scheduleDate)
    },

    vehicles() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].list
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

    handleGoToEditView() {
      this.currentView = VIEWS.EDIT
      this.$store.dispatch(
        `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      )

      this.$store.dispatch(
        `${DRIVERS_STORE_MODULE_NAME}/${DRIVERS_ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      )
    },

    handleOpenVehicle(vehicle) {
      this.currentVehicle = vehicle
      this.$refs['vehicle-fast-view'].show()
    },

    handleOpenDriver(driver) {
      this.currentDriver = driver
      this.$refs['driver-fast-view'].show()
    },

    handleOpenVehiclesList() {
      this.$refs['vehicles-select-dialog'].show()
    },

    handleOpenDriversList() {
      this.$refs['drivers-select-dialog'].show()
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationForm {
  &__left-view {
    margin-left: -25px;
  }
}
</style>
