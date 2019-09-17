<template>
<div
  class="PageDriver"
  v-loading="loading"
>
  <QueueState v-if="false" />

  <CurrentRaceItem
    v-if="race && !loading"
    :race="race"
    @update="getDriverCurrentRaces"
    :visible="true"
  />

  <div
    class="PageDriver__empty"
    v-if="!loading && !race"
  >
    <span v-html="$t('forms.driverWorkspace.getStartedWithNewRace')" />
  </div>

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

  head() {
    return {
      title: this.title
    }
  },

  data() {
    return {
      loading: false,

      race: null
    }
  },

  computed: {
    visibleCurrentRace() {
      return false
    },

    title() {
      const user = this.$store.getters["user/username"]
      return this.$t('forms.common.driver') + ': ' + user + ' - Transithub'
    }
  },

  async created() {
    await this.getDriverCurrentRaces()
  },

  methods: {
    async getDriverCurrentRaces() {
      this.loading = true

      const race = await this.$api.driverRace.getDriverCurrentRaces()

      this.race = {
        ...race,
        date: race.waybillDate,
        distance: race.distance || '',
        number: race.waybillNumber,
        goodName: race.goodsName
      }

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.PageDriver {
    position: relative;

    height: calc(100vh - 130px);

    padding-top: .5rem;

    &__loading {
        height: 340px;

        margin: 0 25px;
    }

    &__empty {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;
        color: $--color-info;
    }
}
</style>
