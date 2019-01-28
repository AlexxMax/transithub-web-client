<template>
  <span class="BackButton" @click="handleGoBack">
    <fa icon="long-arrow-alt-left" />
    <span v-if="text">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'th-back-button',

  props: {
    text: String
  },

  methods: {
    handleGoBack() {
      let redirectToList = false
      let from = this.$store.state.route.from.name
      if (from) {
        from = from.split('-')
        if (from[from.length - 1] === 'login') {
          redirectToList = true
        } else {
          this.$router.go(-1)
        }
      } else {
        redirectToList = true
      }

      if (redirectToList) {
        const words = this.$route.name.split('-')
        words.splice(words.length - 1, 1)
        const name = words.join('-')
        const { params, query } = this.$route
        this.$router.push({ name, params, query })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.BackButton {
  margin-right: 10px;
  padding: 3px 5px;
  color: #FECD34;
  cursor: pointer;

  &:hover {
    background-color: rgba(245, 205, 75, 0.1);
    border-radius: 20px;
  }

  span {
    padding-left: 10px;
    color: #606266;
  }
}
</style>
