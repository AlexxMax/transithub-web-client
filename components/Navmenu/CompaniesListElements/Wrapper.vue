<template>
  <div class="CompaniesListWrapper">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-companies-list-wrapper'
}
</script>

<style lang="scss" scoped>
.CompaniesListWrapper {
  margin: 5px 9px;
  border-radius: 5px;
  width: inherit;
  height: 40px;
  cursor: pointer;
}
</style>
