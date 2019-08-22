<template>
  <div>
    <Settings
      :driver="driver"
      :visible="visibleSettingsForm"
      :name="username"
      :size="80"
    />
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
    driver() {
      const item = {
        fullName: '---',
        phone: '---'
      }

      return item
    },
    visibleSettingsForm() {
      return true
    },
    
    username: function() {
      return this.$store.getters["user/username"];
    },
    
    title () {
    	return this.$t('forms.common.driver') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },
}
</script>

<style lang="sass" scoped>

</style>
