<template>
  <transition
    name="slideRight"
    enter-active-class="animated slideInRight faster"
    leave-active-class="animated slideOutRight faster">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'th-transition-slide-right'
}
</script>
