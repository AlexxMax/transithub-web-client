<template>
  <GroupsMenu
    v-bind="$attrs"
    :groups="groups"
    :grouped="$store.getters['userSettings/isRequestsListGrouped']"
    @changed="groups => {this.groups = groups }"
    @close="$emit('close')"
    @grouping="type => $emit('grouping', type)"/>
</template>

<script>
import GroupsMenu from '@/components/Common/Lists/GroupsMenu'

export default {
  name: 'th-requests-groups-menu',

  components: {
    GroupsMenu
  },

  computed: {
    groups: {
      set(groups) {
        this.$store.commit('userSettings/SET_REQUESTS_LIST_GROUPS', groups.slice())
      },
      get() {
        const groups = [
          {
            name: 'number',
            title: this.$t('forms.common.number')
          }, {
            name: 'scheduleDate',
            title: this.$t('forms.common.date')
          }, {
            name: 'clientName',
            title: this.$t('forms.common.client')
          }, {
            name: 'pointFrom',
            title: this.$t('forms.common.pointFrom')
          }, {
            name: 'pointTo',
            title: this.$t('forms.common.pointTo')
          }
        ]
        const stateGroups = this.$store.state.userSettings.requests.list.groups.slice()
        return stateGroups.length === 0 ? groups : stateGroups
      }
    }
  }
}
</script>
