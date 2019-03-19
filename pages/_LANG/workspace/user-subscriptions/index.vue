<template>
  <PagePattern>
    <FormList
      :list="list"
      @eventFetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from "@/components/UserSubscriptions/FormList"

export default {
  components: {
    PagePattern,
    FormList
  },

  computed: {
    list() {
      return this.$store.getters['subscriptions/listFiltered']
    }
  },

  methods: {
    async fetch() {
      return await this.$store.dispatch('subscriptions/loadList')
    }
  },

  fetch({ store }) {
    store.commit('subscriptions/RESET')
    return store.dispatch('subscriptions/loadList')
  }
}
</script>