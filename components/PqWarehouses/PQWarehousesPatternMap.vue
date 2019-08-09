<template>
<div class="PQWarehousesPatternMap">

  <GoogleMap
    style="height: 500px;"
    center-on-ukraine
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
import GoogleMap from '@/components/Common/GoogleMap/GoogleMap'

export default {
  components: {
    Button,
    GoogleMap
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
