<template>
  <CommonPattern>
    <ElementForm />
  </CommonPattern>
</template>

<script>
import CommonPattern from '@/components/Common/Pattern'
import ElementForm from '@/components/Races/FormElement'

import { STORE_MODULE_NAME } from '@/utils/races'

export default {
  components: {
    CommonPattern,
    ElementForm
  },

  computed: {
    title () {
      const item = this.$store.state[STORE_MODULE_NAME].item
      return this.$t('forms.race.title') + ': №' + item.number + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/races'))
    }
  },

  beforeCreate() {
    if (!this.$store.state.races.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noRace') })
    }
  },

  fetch({ store, route }) {
    return store.dispatch('races/loadElement', route.params.guid)
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
}
</script>
