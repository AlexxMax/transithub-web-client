<template>
<div class="PQWarehousesPatternMap">

  <MapPointSelect
    v-if="false"
    :lat="form.lat"
    :lng="form.lng"
    center-on-ukraine
    style="height: 500px;"
    @select="handleMapPointSelect"
  />

  lat
  <input type="text" v-model="form.lat">
  lng
  <input type="text" v-model="form.lng">

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
    }
  },

  data() {
    return {

      buttons: [
        { text: 'Назад', type: '', function: this.handleClickPrev },
        { text: 'Зберегти', type: 'primary', function: this.handleClickSave }
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
