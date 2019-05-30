<template>
  <div>

    <RightView
      :title="title"
      :visible="visible"
      :width="width"
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
            :items="items"
          />
        </SlideRight>
      </div>

    </RightView>

  </div>
</template>

<script>
import RightView from '@/components/Common/RightView'
import SlideRight from '@/components/Common/Transitions/SlideRight'
import VehiclesRegistersGenetarionFormListView from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormListView'
import VehiclesRegistersGenetarionFormEditView from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenetarionFormEditView'

import {
  STORE_MODULE_NAME as VEHICLES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_ACTIONS_KEYS
} from '@/utils/vehicles'

const VIEWS = Object.freeze({
  LIST: 'LIST',
  EDIT: 'EDIT'
})

export default {
  name: 'th-vehicles-registers-generations-form',

  components: {
    RightView,
    SlideRight,
    VehiclesRegistersGenetarionFormListView,
    VehiclesRegistersGenetarionFormEditView
  },

  props: {
    request: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    items: [],

    visible: false,
    currentView: VIEWS.LIST,

    VIEWS
  }),

  computed: {
    title() {
      return this.$t('forms.request.titleDateNumber').replace('%1', this.request.number).replace('%2', this.request.scheduleDate)
    },

    width() {
      return this.currentView === VIEWS.LIST ? '70%' : '100%'
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
