<template>
  <div>
    <Invitation />
  </div>
</template>

<script>
import Invitation from '@/components/Invitation/Invitation'

export default {
  layout: "authorization",

  components: {
    Invitation
  },

  computed: {
    title () {
    	return this.$t('forms.invitation.title') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>

