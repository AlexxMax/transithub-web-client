<template>
  <div>
    <QueueState />
  </div>
</template>

<script>
import QueueState from '@/components/DriverWorkspace/QueueState'

export default {
  layout: "driver",

  components: {
    QueueState
  },

  computed: {
    title () {
    	return this.$t('forms.common.driver') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="sass" scoped>

</style>