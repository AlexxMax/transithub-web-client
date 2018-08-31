<template>
  <div class="th-subordinate-list-item-wrapper" @click="$emit('click')">
    <div class="th-subordinate-list-item">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.th-subordinate-list-item-wrapper {
  margin: 10px 0;
  padding: 0 5px;

  .th-subordinate-list-item {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #bebebe1a;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      border-color: rgb(220, 223, 230);
    }
  }
}
</style>

