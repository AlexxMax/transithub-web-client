<template>
  <Scaffold :buttons="buttons">
    Select vehicle register
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'

export default {
  name: 'th-driver-workspace-race-form-select-vehicle-register',

  components: {
    Scaffold,
  },

  props: {
    buttons: Array,
  },
}
</script>

<style lang='scss' scoped>

</style>
