<template>
  <div>
    <h1 v-if="error.statusCode === 404">{{ message }}</h1>
    <h1 v-else>{{ $t('messages.error') }}</h1>
    <nuxt-link to="/">{{ $t('messages.toMainPage') }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],

  computed: {
    message() {
      return this.error.message || this.$t('messages.404')
    }
  }
}
</script>
