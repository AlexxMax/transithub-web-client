<template>
  <div>
    <div class="th-wrapper">
      <UserRegistration />
    </div>
  </div>
</template>

<script>
import UserRegistration from "@/components/Registration/UserRegistration";

export default {
  layout: "authorization",

  components: {
    UserRegistration
  },

  computed: {
    title () {
    	return this.$t('forms.user.registration.title') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  }
};
</script>

<style lang="scss" scoped>
.th-wrapper {
  min-height: calc(100vh - 250px - 250px);
}
</style>
