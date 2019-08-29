<template>
<div
  class="ButtonBack"
  @click="handleClick"
>
  <fa
    class="ButtonBack__icon"
    icon="arrow-left"
  />

  <span>{{ text }}</span>
</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    useRouter: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    handleClick() {
      if (this.useRouter) {
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
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ButtonBack {
    margin-bottom: 1rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    color: $--color-black;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: bold;

    cursor: pointer;
    transition: 0.2s;

    svg {
        color: $--color-info;

        transition: 0.2s;
    }

    &:hover {

        color: $--color-danger;

        svg {
            color: $--color-danger;

            transform: scale(1.25) translateX(-.5rem);
            transition: 0.2s;
        }
    }

    &__icon {
      height: 1rem;
      width: 1rem;

      margin-right: 1rem;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1rem;
    }

}
</style>
