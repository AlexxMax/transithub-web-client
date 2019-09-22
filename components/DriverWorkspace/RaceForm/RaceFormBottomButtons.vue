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
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: $--driver-workspace-padding;
  border: {
    top: $--driver-workspace-border;
    bottom: $--driver-workspace-border;
  }
  z-index: 5;
  background-color: $--color-white;

  &__btn {
    width: 100%;
  }
}
</style>
