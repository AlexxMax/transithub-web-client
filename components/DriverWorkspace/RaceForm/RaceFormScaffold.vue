<template>
  <div>
    <div class="RaceFormScaffold__content">
      <div>SRAKA-MOTUKA</div>

      <slot/>
    </div>

    <BottomButtons :buttons="buttons"/>
  </div>
</template>

<script>
import BottomButtons from '@/components/DriverWorkspace/RaceForm/RaceFormBottomButtons'

export default {
  name: 'th-driver-workspace-race-form-scaffold',

  components: { BottomButtons },

  props: {
    buttons: Array,
  }
}
</script>

<style lang='scss' scoped>
.RaceFormScaffold {
  &__content {
    min-height: calc(100vh - 117px);
  }
}
</style>
