<template>
  <div>
    <Settings />
  </div>
</template>

<script>
import Settings from '@/components/DriverWorkspace/Settings/Settings'

export default {
  layout: "driver",

  components: {
    Settings
  },

  computed: {
    title () {
    	return this. $t('links.system.settings') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>