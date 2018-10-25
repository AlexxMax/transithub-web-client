<template>
  <div :class="{ 'ItemCard__wrapper': true, 'ItemCard__wrapper-in-group': inGroup }">
    <div :class="{ 'ItemCard': true, 'ItemCard__item-in-group': inGroup }">

      <slot/>

      <div class="ItemCard__footer">
        <slot name="footer-left"/>
        <slot name="footer-right"/>
      </div>

      <Collapse>
        <div class="ItemCard__addon" v-if="showAddon">
          <slot name="addon"/>
        </div>
      </Collapse>
    </div>
  </div>
</template>

<script>
import Collapse from '@/components/Common/Transitions/Collapse'

export default {
  name: 'th-list-item-card',

  components: {
    Collapse
  },

  props: {
    showAddon: Boolean
  },

  data() {
    return {
      inGroup: false
    }
  },

  mounted() {
    // if Item is in group
    if (this.$parent.$el.className === 'ListItemGroupe__body'
      || this.$parent.$parent.$el.className === 'ListItemGroupe__body') {
      this.inGroup = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ItemCard__wrapper {
  margin: 10px 0;
  padding: 0 5px;

  &.ItemCard__wrapper-in-group {
    margin: 10px -16px;
    padding: 0;
  }

  .ItemCard {
    color: #606266;
    padding: 20px 15px;
    background-color: white;
    border: 1px solid #bebebe1a;
    border-radius: 5px;

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    &.ItemCard__item-in-group {
      border-radius: 0;

      &:hover {
        box-shadow: none;
        background-color: #f8f8f8;
      }
    }

    .ItemCard__footer {
      background-color: #f8f8f8;
      margin: 10px -15px -20px -15px;
      padding: 5px 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .ItemCard__addon {
      margin-top: 40px;
    }
  }
}
</style>
