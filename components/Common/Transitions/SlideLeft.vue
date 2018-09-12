<template>
  <transition
    name="slideLeft"
    enter-active-class="animated slideInLeft faster"
    leave-active-class="animated slideOutLeft faster">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'th-transition-slide-left'
}
</script>
