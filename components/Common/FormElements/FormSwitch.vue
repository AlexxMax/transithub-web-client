<template>
  <div class="SwitchButton">
    <span v-if="title" class="SwitchButton__title">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'th-switch-button',

  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.SwitchButton {
  

  &__title {
    
  }
}

