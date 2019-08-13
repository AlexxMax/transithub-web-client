<template>
<el-dialog
  class="PQWarehousesEditDialog"
  :title="patternTitle"
  :visible.sync="visible"
  :before-close="handleBeforeClose"
  :z-index="4000"
>
  <div class="PQWarehousesEditDialog__content">

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
        :form.sync="form"
        v-if="currentStep === STEPS.main"
        @cancel="handleBeforeClose"
        @next="handleClickNext"
      />

      <PQWarehousesEditDialogAddress
        :form.sync="form"
        v-if="currentStep === STEPS.location"
        @next="handleClickNext"
        @prev="handleClickPrev"
      />

      <PQWarehousesEditDialogMap
        :creating="creating"
        :form.sync="form"
        v-if="currentStep === STEPS.map"
        @prev="handleClickPrev"
        @save="handleClickSave"
      />
    </div>

  </div>

</el-dialog>
</template>

<script>
import { STORE_MODULE_NAME, EDIT_DIALOG_TYPES, ACTIONS_KEYS, MUTATIONS_KEYS } from '@/utils/pq.warehouses'
import * as confirm from '@/utils/confirm'

import CommonSteps from '@/components/Common/CommonSteps'
import PQWarehousesEditDialogMain from '@/components/PQWarehouses/PQWarehousesEditDialogMain'
import PQWarehousesEditDialogAddress from '@/components/PQWarehouses/PQWarehousesEditDialogAddress'
import PQWarehousesEditDialogMap from '@/components/PQWarehouses/PQWarehousesEditDialogMap'

const STEPS = {
  main: 0,
  location: 1,
  map: 2
}

export default {
  components: {
    CommonSteps,
    PQWarehousesEditDialogMain,
    PQWarehousesEditDialogAddress,
    PQWarehousesEditDialogMap
  },

  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // },

    // creating: {
    //   type: Boolean,
    //   default: false
    // },

    // default: {
    //   type: Object,
    //   default: () => null
    // }
  },

  data() {
    return {
      STEPS,
      currentStep: STEPS.main,
      steps: [
        this.$t('forms.pqWarehouses.pattern.steps.main.title'),
        this.$t('forms.pqWarehouses.pattern.steps.location.title'),
        this.$t('forms.pqWarehouses.pattern.steps.map.title')
      ],

      form: {
        name: '',
        organisation: '',

        location: '',
        address: '',

        lat: 0,
        lng: 0
      }
    }
  },

  watch: {
    visible(value) {

      if (value) this.currentStep = STEPS.main
      else setTimeout(() => this.currentStep = -1, 500)

      if (this.visible && !this.creating && this.default)
        this.form = {
          name: this.default.name,
          organisation: this.default.organisationGuid,

          location: this.default.localityKoatuu,
          address: this.default.fullAddress,

          lat: this.default.geoRegistrationLat,
          lng: this.default.geoRegistrationLng
        }

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
    handleClickPrev() {
      this.currentStep -= 1
    },

    async handleClickNext() {
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
      const title = this.creating ?
        this.$t('forms.pqWarehouses.pattern.titleCreateCancel') :
        this.$t('forms.pqWarehouses.pattern.titleChangeCancel')

      const touched = this.form.name || this.form.organisation

      if (touched)
        confirm.warning(title).then(() => this.closeAndReset())
      else
        this.closeAndReset()
    },

    closeAndReset() {
      setTimeout(() => this.$resetData(), 500)

      this.visible = false
    }
  }
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
