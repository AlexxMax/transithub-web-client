<template>
  <div>
    <ListWrapper
      :loading="loading"
      :list-is-empty="list.length === 0"
      :empty-list-title="$t('lists.racesEmptyList')">
      <ListItem
        v-for="r of list"
        :key="r.guid"
        :row="r"
        :no-events="noEvents"
        :open="handleOpenItem"/>
    </ListWrapper>

    <FastView
      subordinate
      :visible="raceVisible"
      :guid="raceCurrentGuid"
      :request-guid="requestGuid"
      :vehicle-register-guid="vehicleRegisterGuid"
      @close="handleFastViewClose"/>
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import ListItemGroupe from '@/components/Common/Lists/ItemGroupe'
import ListItem from '@/components/Races/ListItem'
import FastView from '@/components/Races/FastView'

export default {
  name: 'th-races-subordinate-list',

  components: {
    CommonList,
    ListWrapper,
    ItemsWrapper,
    ListItemGroupe,
    ListItem,
    FastView
  },

  props: {
    requestGuid: String,
    vehicleRegisterGuid: String,
    instantFillUp: Boolean,
    noEvents: Boolean
  },

  data() {
    return {
      loading: false,
      fetched: false,
      raceVisible: false,
      raceCurrentGuid: null
    }
  },

  computed: {
    list() {
      return this.$store.getters['races/getSubordinateList']({
        request: this.requestGuid,
        vehicleRegister: this.vehicleRegisterGuid
      })
    }
  },

  methods: {
    async fetch() {
      this.loading = true
      await this.$store.dispatch('races/fetchSubordinateRaces', {
        requestGuid: this.requestGuid,
        vehicleRegisterGuid: this.vehicleRegisterGuid
      })
      this.loading = false
    },
    async fillUp() {
      if (!this.fetched) {
        await this.fetch()
        this.fetched = true
      }
    },
    handleOpenItem(raceGuid) {
      this.raceCurrentGuid = raceGuid
      this.raceVisible = true
    },
    handleFastViewClose() {
      this.raceVisible = false
      this.raceCurrentGuid = null
    }
  },

  async created() {
    if (this.instantFillUp) {
      await this.fillUp();
    }
  }
}
</script>
