<template>
  <div>
    <DriverProfile />
  </div>
</template>

<script>
import DriverProfile from '@/components/DriverWorkspace/Settings/DriverProfile'

import {
  PERSON_DOCS_TYPE
} from '@/utils/driver'

export default {
  layout: "driver",

  components: {
    DriverProfile
  },

  computed: {
    title () {
    	return this.$t('forms.driverWorkspace.driverInfo') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>