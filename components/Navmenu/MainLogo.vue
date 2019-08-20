<template>
  <nuxt-link class="th-main-logo" :to="to">
    <svg x="0px" y="0px"  viewBox="0 0 227 119" xml:space="preserve">
      <g>
        <rect x="49.9" y="42.4" class="st0" width="23.8" height="71.5" />
        <polygon class="st0" points="135.5,6.7 115.3,6.7 111.7,6.7 8.1,6.7 8.1,30.5 111.7,30.5 111.7,113.9 135.5,113.9 135.5,72.1
          183.3,72.1 183.3,48.3 135.5,48.3 	" />
        <rect x="195.2" y="6.7" class="st0" width="23.8" height="107.2" />
      </g>
    </svg>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: String
  }
}
</script>

<style>
/* .th-main-logo {
  display: block;
  width: 42px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 20px;
} */

.th-main-logo {
  display: block;
  width: 42px;
  margin-top: 5px;
}
</style>
