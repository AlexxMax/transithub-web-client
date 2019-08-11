<template>
<el-dialog
  class="PQWarehousesPattern"
  :title="patternTitle"
  :visible.sync="visible"
  :before-close="handleBeforeClose"
>
  <div class="PQWarehousesPattern__content">

    <pre>{{ form }}</pre>

    <CommonSteps
      class="PQWarehousesPattern__steps"
      :active="currentStep"
      :steps="steps"
    />

    <div
      class="PQWarehousesPattern__step-content"
      v-loading="loading"
    >
      <PQWarehousesPatternMain
        :form.sync="form"
        v-if="currentStep === 0"
        @cancel="handleBeforeClose"
        @next="handleClickNext"
      />

      <PQWarehousesPatternAddress
        :form.sync="form"
        v-if="currentStep === 1"
        @next="handleClickNext"
        @prev="handleClickPrev"
      />

      <PQWarehousesPatternMap
        :create="create"
        :form.sync="form"
        v-if="currentStep === 2"
        @prev="handleClickPrev"
        @save="handleClickSave"
      />
    </div>

  </div>

</el-dialog>
</template>

<script>
import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/pq.warehouses'

import CommonSteps from '@/components/Common/CommonSteps'
import PQWarehousesPatternMain from '@/components/PQWarehouses/PQWarehousesPatternMain'
import PQWarehousesPatternAddress from '@/components/PQWarehouses/PQWarehousesPatternAddress'
import PQWarehousesPatternMap from '@/components/PQWarehouses/PQWarehousesPatternMap'

export default {
  components: {
    CommonSteps,
    PQWarehousesPatternMain,
    PQWarehousesPatternAddress,
    PQWarehousesPatternMap
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    create: {
      type: Boolean,
      default: false
    },

    default: {
      type: Object,
      default: () => null
    }
  },

  data() {
    return {
      currentStep: 0,
      steps: [
        this.$t('forms.pqWarehouses.item.steps.main.title'),
        this.$t('forms.pqWarehouses.item.steps.location.title'),
        this.$t('forms.pqWarehouses.item.steps.map.title')
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

      if (value) this.currentStep = 0
      else setTimeout(() => this.currentStep = -1, 500)

      if (this.visible && !this.create && this.default)
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
      return this.create ?
      this.$t('forms.pqWarehouses.pattern.titleCreate') :
      this.$t('forms.pqWarehouses.pattern.titleChange')
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    }
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

      if (this.create)
        result = await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`, this.form)

      else
        result = await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`, { guid: this.default.guid, form: this.form })

      if (result) this.closeAndReset()
    },

    handleBeforeClose() {
      const title = this.create ?
      this.$t('forms.pqWarehouses.pattern.titleCreateCancel') :
      this.$t('forms.pqWarehouses.pattern.titleChangeCancel')

      const touched = this.form.name || this.form.organisation

      if (touched)
        this.$confirm('', title).then(() => this.closeAndReset())
      else
        this.closeAndReset()
    },

    closeAndReset() {
      setTimeout(() => this.$resetData(), 500)

      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesPattern {

    .el-step__arrow {}

    &__steps {
        margin-bottom: 2rem;
    }
}
</style>
