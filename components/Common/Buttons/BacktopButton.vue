<template>
  <back-to-top bottom="70px" right="10px" visibleoffset="500">
    <button type="button" class="btn btn-info btn-to-top">
      <fa icon="chevron-up"/>
    </button>
  </back-to-top>
</template>

<script>
export default {
  name: 'th-back-to-top-button'
}
</script>

<style lang="scss" scoped>
.btn-to-top {
  color: #BABABA;
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,.18);
  opacity: .95;
  transition: all .5s ease-in-out;
  border: none;

  &:hover {
    opacity: .65;
    box-shadow: 0 0 10px rgba(0,0,0,.38);

  }
}
</style>