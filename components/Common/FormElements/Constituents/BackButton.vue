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
    useRouter: {
      type: Boolean,
      default: true,
    },
    text: String,
  },

  methods: {
    handleGoBack() {
      if (this.useRouter) {
        let redirectToList = false
        let from = this.$store.state.route.from
        if (from) {
          from = from.name
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
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.BackButton {
  margin-right: 10px;
  padding: 3px 5px;
  color: #FFD74D;
  cursor: pointer;
  transition: .5s;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(245, 205, 75, 0.1);
    border-radius: 20px;
  }

  span {
    padding-left: 10px;
    color: #606266;
  }
}
</style>
