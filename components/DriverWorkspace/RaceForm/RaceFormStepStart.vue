<template>
  <Scaffold :buttons="buttons">
    Start
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'

export default {
  name: 'th-driver-workspace-race-form-start',

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
