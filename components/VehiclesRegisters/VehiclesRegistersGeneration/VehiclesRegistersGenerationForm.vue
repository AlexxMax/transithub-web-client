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
          <VehiclesRegistersGenetarionFormListView
            :request-guid="request.guid"
            @go-to-edit-view="handleGoToEditView"
          />
        </SlideRight>

        <SlideRight v-if="currentView === VIEWS.EDIT">
          <VehiclesRegistersGenetarionFormEditView
            :request="request"
          />
        </SlideRight>
      </div>

    </RightView>

    <LeftView
      class="VehiclesRegistersGenerationForm__left-view"
      v-if="currentView === VIEWS.EDIT"
      :title="$t('forms.common.select')"
      :visible="visible"
      width="25%"
    >
      <VehiclesRegistersGenerationFormSelect/>
    </LeftView>

  </div>
</template>

<script>
import RightView from '@/components/Common/RightView'
import LeftView from '@/components/Common/LeftView'
import SlideRight from '@/components/Common/Transitions/SlideRight'
import VehiclesRegistersGenetarionFormListView from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormListView'
import VehiclesRegistersGenetarionFormEditView from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenetarionFormEditView'
import VehiclesRegistersGenerationFormSelect from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormSelect'

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
    LeftView,
    SlideRight,
    VehiclesRegistersGenetarionFormListView,
    VehiclesRegistersGenetarionFormEditView,
    VehiclesRegistersGenerationFormSelect
  },

  props: {
    request: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    visible: false,
    currentView: VIEWS.LIST,

    VIEWS
  }),

  computed: {
    title() {
      return this.$t('forms.request.titleDateNumber').replace('%1', this.request.number).replace('%2', this.request.scheduleDate)
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
