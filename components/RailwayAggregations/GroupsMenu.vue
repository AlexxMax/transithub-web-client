<template>
  <GroupsMenu
    v-bind="$attrs"
    :groups="groups"
    :grouped="$store.getters['userSettings/isRailwayAggregationsListGrouped']"
    @changed="groups => {this.groups = groups }"
    @close="$emit('close')"/>
</template>

<script>
import GroupsMenu from '@/components/Common/Lists/GroupsMenu'

export default {
  name: 'th-railway-aggregation-groups-menu',

  components: {
    GroupsMenu
  },

  computed: {
    groups: {
      set(groups) {
        this.$store.commit('userSettings/SET_RAILWAY_AGGREGATIONS_LIST_GROUPS', groups.slice())
      },
      get() {
        const groups = [
          {
            name: 'stationFrom',
            title: this.$t('forms.common.stationFrom')
          }, {
            name: 'stationTo',
            title: this.$t('forms.common.stationTo')
          }
        ]
        const stateGroups = this.$store.state.userSettings.railwayAggregations.list.groups.slice()
        return stateGroups.length === 0 ? groups : stateGroups
      }
    }
  }
}
</script>
