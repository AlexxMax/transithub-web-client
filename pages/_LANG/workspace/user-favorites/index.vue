<template>
  <PagePattern>
    <FormList
      :list="list"
      @eventFetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from '@/components/UserFavorites/FormList'

export default {
  components: {
    PagePattern,
    FormList
  },

  computed: {
    list() {
      return this.$store.getters['favorites/listFiltered']
    },

    title () {
    	return this.$t('links.system.userFavorites') + ' - Transithub'
  	}
  },

  methods: {
    async fetch() {
      return await this.$store.dispatch('favorites/loadList')
    }
  },

  head () {
    return {
      title: this.title
    }
  },

  fetch({ store }) {
    store.commit('favorites/RESET')
    return store.dispatch('favorites/loadList')
  }
}
</script>