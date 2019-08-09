<template>
<el-dialog
  class="PQWarehousesPattern"
  title="Редагування складу"
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

    <div class="PQWarehousesPattern__step-content">
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
// import Fade from '@/components/Common/Transitions/Fade'
import CommonSteps from '@/components/Common/CommonSteps'
import PQWarehousesPatternMain from '@/components/PQWarehouses/PQWarehousesPatternMain'
import PQWarehousesPatternAddress from '@/components/PQWarehouses/PQWarehousesPatternAddress'
import PQWarehousesPatternMap from '@/components/PQWarehouses/PQWarehousesPatternMap'

export default {
  components: {
    // Fade,
    CommonSteps,
    PQWarehousesPatternMain,
    PQWarehousesPatternAddress,
    PQWarehousesPatternMap
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    visible(value) {
      this.currentStep = this.visible ? 0 : -1
    }
  },

  data: () => ({
    currentStep: 0,
    steps: ['Основне', 'Розташування', 'Зона реєстрації'],

    form: {
      name: '',
      organisation: '',

      location: '',
      address: '',

      coordinates: ''
    }
  }),

  methods: {
    handleClickPrev() {
      this.currentStep -= 1
    },

    async handleClickNext() {
      this.currentStep += 1
    },

    handleClickSave() {

    },

    handleBeforeClose() {
      const title = 'Скасувати редагування складу?'
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
