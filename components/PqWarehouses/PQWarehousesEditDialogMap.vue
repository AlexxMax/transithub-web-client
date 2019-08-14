<template>
<div class="PQWarehousesPatternMap">

  <MapPointSelect
    :lat="form.lat"
    :lng="form.lng"
    center-on-ukraine
    style="height: 500px;"
    @select="handleMapPointSelect"
  />

  <div class="PQWarehousesPatternMap__footer">

    <Button
      round
      v-for="(button, index) in buttons"
      :type="button.type"
      :key="index"
      @click="button.function"
    >{{ button.text }}</Button>

  </div>

</div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import MapPointSelect from '@/components/Common/MapPointSelect'

export default {
  components: {
    Button,
    MapPointSelect
  },

  props: {
    form: {
      type: Object,
      required: true
    },

    creating: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

      buttons: [{
          text: this.$t('forms.pqWarehouses.pattern.buttonPrev'),
          type: '',
          function: this.handleClickPrev
        },
        {
          text: this.creating ? this.$t('forms.pqWarehouses.pattern.buttonCreate') : this.$t('forms.pqWarehouses.pattern.buttonChange'),
          type: 'primary',
          function: this.handleClickSave
        }
      ]

    }
  },

  methods: {
    handleClickPrev() {
      this.$emit('prev')
    },

    handleClickSave() {
      this.$emit('save')
    },

    handleMapPointSelect({ lat, lng }) {
      this.form.lat = lat
      this.form.lng = lng
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesPatternMap {
    &__footer {
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }
}
</style>
