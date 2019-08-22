<template>
  <div>

  </div>
</template>

<script>
export default {
  layout: "driver",

  computed: {
    title () {
    	return this.$t('forms.common.driver') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },
}
</script>

<style lang="sass" scoped>

</style>
