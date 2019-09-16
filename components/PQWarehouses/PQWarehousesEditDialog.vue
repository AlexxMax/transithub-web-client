<template>
<el-dialog
  class="PQWarehousesEditDialog"
  :title="patternTitle"
  :visible.sync="visible"
  :before-close="handleBeforeClose"
  :z-index="4000"
>
  <div class="PQWarehousesEditDialog__content">

    <!-- <pre>{{ form }}</pre> -->

    <CommonSteps
      class="PQWarehousesEditDialog__steps"
      :active="currentStep"
      :steps="steps"
    />

    <div
      class="PQWarehousesEditDialog__step-content"
      v-loading="loading"
    >
      <PQWarehousesEditDialogMain
        v-if="currentStep === STEPS.main"
        :key="keyComponent"
        :form.sync="form"
        @cancel="handleBeforeClose"
        @next="handleClickNext"
        @mounted-change="$_closeDialogMixin_reset()"
        @queue-profile-select="resetData"
      />

      <PQWarehousesEditDialogAddress
        v-if="currentStep === STEPS.location"
        :creating="creating"
        :form.sync="form"
        @save="handleClickSave"
        @prev="handleClickPrev"
      />
    </div>

  </div>

</el-dialog>
</template>

<script>
import { STORE_MODULE_NAME, EDIT_DIALOG_TYPES, ACTIONS_KEYS, MUTATIONS_KEYS } from '@/utils/pq.warehouses'
import * as confirm from '@/utils/confirm'
import closeDialog from '@/mixins/closeDialog'

import CommonSteps from '@/components/Common/CommonSteps'
import PQWarehousesEditDialogMain from '@/components/PQWarehouses/PQWarehousesEditDialogMain'
import PQWarehousesEditDialogAddress from '@/components/PQWarehouses/PQWarehousesEditDialogAddress'

const STEPS = {
  main: 0,
  location: 1
}

const getPattern = (item = null) => ({
  name: item ? item.name : '',
  organisation: item ? item.organisationGuid : '',
  address: item ? item.fullAddress : '',
  lat: item ? item.geoRegistrationLat || 0 : 0,
  lng: item ? item.geoRegistrationLng || 0 : 0,
  region: item ? item.regionCode : '',
  district: item ? item.districtCode : '',
  settlement: item ? item.localityKoatuu : '',
  street: item ? item.streetName : '',
  building: item ? item.buildingN : '',
  fullAddress: item ? item.fullAddress : '',
  queueProfileGuid: item ? item.queueProfileGuid : '',
})

const getWarehouse = store => {
  const creation = store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
  const item = { ...store.state[STORE_MODULE_NAME].item }
  return creation ? getPattern() : getPattern(item)
}

export default {
  mixins: [closeDialog('form')],

  components: {
    CommonSteps,
    PQWarehousesEditDialogMain,
    PQWarehousesEditDialogAddress
  },

  data() {
    return {
      STEPS,
      currentStep: STEPS.main,
      steps: [
        { icon: 'home', text: this.$t('forms.pqWarehouses.pattern.steps.main.title') },
        { icon: 'map', text: this.$t('forms.pqWarehouses.pattern.steps.location.title') }
      ],

      form: {},

      keyComponent: 0,
    }
  },

  watch: {
    visible(value) {
      if (value) {
        this.form = getWarehouse(this.$store)
        this.currentStep = STEPS.main
        this.$_closeDialogMixin_reset()
        this.keyComponent += 1
      } else setTimeout(() => this.currentStep = -1, 500)
    }
  },

  computed: {
    patternTitle() {
      return this.creating ?
        this.$t('forms.pqWarehouses.pattern.titleCreate') :
        this.$t('forms.pqWarehouses.pattern.titleChange')
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    },

    visible: {
      get() { return this.$store.state[STORE_MODULE_NAME].editing.showEditDialog },
      set(value) {
        this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, value)
      }
    },

    creating() {
      return this.$store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
    },

    default () {
      return this.$store.state[STORE_MODULE_NAME].item
    }
  },

  async fetch({ store, params }) {
    const guid = params.guid
    const list = store.state[STORE_MODULE_NAME].list
    const item = list ? list.filter(item => item.guid === guid)[0] : null

    if (item) return
    await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, guid)
  },

  methods: {
    resetData(value) {
      this.$_closeDialogMixin_reset()
    },

    handleClickPrev() {
      this.currentStep -= 1
    },

    handleClickNext() {
      this.currentStep += 1
    },

    async handleClickSave() {
      let result

      if (this.creating)
        result = await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`, this.form)

      else
        result = await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`, { guid: this.default.guid, form: this.form })

      if (result) this.closeAndReset()
    },

    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => this.closeAndReset())
    },

    closeAndReset() {
      setTimeout(() => this.$resetData(), 500)
      this.visible = false
    }
  },
}
</script>

<style lang="scss" scoped>
.PQWarehousesEditDialog {

    .el-step__arrow {}

    &__steps {
        margin-bottom: 2rem;
    }
}
</style>
