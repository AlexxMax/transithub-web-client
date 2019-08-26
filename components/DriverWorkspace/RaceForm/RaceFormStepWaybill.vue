<template>
  <Scaffold
    :title="title"
    :subtitle="subtitle"
    :percentage="percentage"
    :buttons="buttons"
    @close="$emit('close')"
  >
    Waybill
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'

export default {
  name: 'th-driver-workspace-race-form-waybill',

  components: {
    Scaffold,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
    form: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
