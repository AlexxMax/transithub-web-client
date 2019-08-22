<template>
  <div class="RaceFormBottomButtons">
    <Button
      class="RaceFormBottomButtons__btn"
      round
      v-for="({ type, handler, title }, index) in buttons"
      :key="index"
      :type="type"
      @click="handler"
    >
      {{ title }}
    </Button>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-driver-workspace-race-form-buttom-buttons',

  components: { Button },

  props: {
    buttons: Array,
  }
}
</script>

<style lang='scss' scoped>
.RaceFormBottomButtons {
  display: flex;
  flex-direction: row;
  padding: 15px;
  box-shadow: 0px -6px 6px rgba(216,216,216,0.2);

  &__btn {
    width: 100%;
  }
}
</style>
