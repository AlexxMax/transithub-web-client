<template>
  <transition
    name="fade"
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'th-transition-fade'
}
</script>
