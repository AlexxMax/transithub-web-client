<template>
  <div>
    <QueueState />
    <CurrentRaceItem
      :race="race"
      :visible="visibleCurrentRace"
    />
  </div>
</template>

<script>
import QueueState from '@/components/DriverWorkspace/QueueState'
import CurrentRaceItem from '@/components/DriverWorkspace/CurrentRaceItem'

export default {
  layout: "driver",

  components: {
    QueueState,
    CurrentRaceItem
  },

  data() {
    return {
      race: {
        status: '',
        date: '',
        pointFromName: '',
        pointToName: '',
        pointFromRegion: '',
        pointToRegion: '',
        distance: 0,
        number: 0,
        goodName: ''
      }
    }
  },

  computed: {
    visibleCurrentRace() {
      return false
    },

    title () {
      const user = this.$store.getters["user/username"]
    	return this.$t('forms.common.driver') + ': ' + user + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },
}
</script>
