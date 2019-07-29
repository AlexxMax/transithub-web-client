<template>
  <div class="FiltersSimpleButtonsView">
    <span
      v-if="showAll"
      class="FiltersSimpleButtonsView__btn FiltersSimpleButtonsView__btn--all"
      :class="{ 'FiltersSimpleButtonsView__btn--toggled': btnAll.toggled }"
      @click="handleClick(btnAll)"
    >
      {{ $t('forms.common.all') }}
    </span>

    <span
      class="FiltersSimpleButtonsView__btn"
      v-for="item of items"
      :key="item.name"
      :class="{ 'FiltersSimpleButtonsView__btn--toggled': item.toggled }"
      @click="handleClick(item)"
    >
      {{ item.title }}
    </span>
  </div>
</template>

<script>
const SELECT_ALL = 'all'

export default {
  name: 'th-filters-simple-buttons-view',

  props: {
    items: Array,
    showAll: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    btnAll: {
      name: SELECT_ALL,
      toggled: false
    }
  }),

  methods: {
    handleClick(item) {
      item.toggled = !item.toggled
      if (item.name === SELECT_ALL) {
        this.items.forEach(element => element.toggled = item.toggled)
      } else {
        let allToggled = true
        for (const element of this.items) {
          if (!element.toggled) {
            allToggled = false
            break;
          }
        }
        this.btnAll.toggled = allToggled
      }

      this.$emit('click', this.items, item.name, item.toggled)
    }
  }
}
</script>

<style lang='scss' scoped>
.FiltersSimpleButtonsView {
  margin: {
    top: 10px;
    bottom: 10px;
  };
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;

  &__btn {
    width: fit-content;
    text-decoration: none;
    margin: {
      top: 10px;
      right: 15px;
    };
    padding: 7px 15px;
    color: black;
    font-size: 12px;
    font-weight: 400;
    border-radius: 50px;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    background-color: #eeeeee;

    &:hover {
      cursor: pointer;
      opacity: .8;
    }

    &--all {
      margin-right: 25px;
    }

    &--toggled {
      background: #b9b9b9;
      color: white;
    }
  }
}
</style>
