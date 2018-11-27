<template>
  <GroupsMenu
    v-bind="$attrs"
    :groups="groups"
    :grouped="$store.getters['userSettings/isVehiclesRegistersListGrouped']"
    @changed="groups => {this.groups = groups }"
    @close="$emit('close')"
    @grouping="type => $emit('grouping', type)"/>
</template>

<script>
import GroupsMenu from '@/components/Common/Lists/GroupsMenu'

export default {
  name: 'th-vehicles-registers-groups-menu',

  components: {
    GroupsMenu
  },

  computed: {
    groups: {
      set(groups) {
        this.$store.commit('userSettings/SET_VEHICLES_REGISTERS_LIST_GROUPS', groups.slice())
      },
      get() {
        const groups = [
          {
            name: 'request',
            title: this.$t('forms.request.title')
          }, {
            name: 'date',
            title: this.$t('forms.common.date')
          }, {
            name: 'driver',
            title: this.$t('forms.common.driver')
          }, {
            name: 'vehicle',
            title: this.$t('forms.common.vehicle')
          }, {
            name: 'pointFrom',
            title: this.$t('forms.common.pointFrom')
          }, {
            name: 'pointTo',
            title: this.$t('forms.common.pointTo')
          }
        ]
        const stateGroups = this.$store.state.userSettings.vehiclesRegisters.list.groups.slice()
        return stateGroups.length === 0 ? groups : stateGroups
      }
    }
  }
}
</script>
