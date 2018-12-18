<template>
  <CommonPattern>
    <ElementForm />
  </CommonPattern>
</template>

<script>
import CommonPattern from '@/components/Common/Pattern'
import ElementForm from '@/components/Races/FormElement'

import EventBus from '@/utils/eventBus'

export default {
  components: {
    CommonPattern,
    ElementForm
  },

  beforeCreate() {
    if (!this.$store.state.races.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noRace') })
    }
  },

  mounted() {
    EventBus.$on("workspace-changed", () => {
      if (this.$route.params.guid) {
        this.$router.push("/workspace/races")
      }
    })
  },

  fetch({ store, route }) {
    return store.dispatch('races/loadElement', route.params.guid)
  }
}
</script>
