<template>
  <div class="Select" v-on-clickaway="hide">
    <div :class="companySelectClasses" @click="handleToggled">
      <div class="Select__main-title">
        <div class="Select__main-title-avatar">
          <slot name="avatar" />
        </div>

        <div v-if="toggled" class="Select__main-title-search">
          <input
            ref="search"
            v-model="search"
            type="text"
            :placeholder="searchPlaceholder"
            @input="handleSearch"
          />
        </div>
        <div v-else class="Select__main-title-text">
          {{ selected.text }}
        </div>
      </div>
    </div>

    <div
      v-if="items.length > 0"
      :class="companySelectListClasses">
      <div
        class="Select__list-item"
        v-for="item of items"
        :key="item.key"
        @click="handleSelect(item.key);"
      >
        <slot v-bind="item"> {{ item.text }} </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "th-company-select",

  props: {
    list: Array,
    searchPlaceholder: {
      type: String,
      default: "Search"
    },
    initKey: [ String, Number ]
  },

  data: () => ({
    toggled: false,
    search: null,
    needSearch: false,
    value: null,
    selectedItem: {}
  }),

  computed: {
    companySelectClasses() {
      return {
        Select__main: true,
        "Select__main-toggle": this.toggled
      };
    },
    companySelectListClasses() {
      return {
        Select__list: true,
        "Select__list-show": this.toggled
      };
    },
    items() {
      if (this.search && this.needSearch) {
        return this.list.filter(item => item.text.includes(this.search));
      }
      return this.list;
    },
    selected() {
      let selected = { text: this.searchPlaceholder }
      if (this.selectedItem.text) {
        selected = this.selectedItem;
      } else if (this.initKey) {
        selected = this.items.find(item => item.key === this.initKey)
      } else if (this.items.length > 0) {
        selected = this.items[0];
      }
      return selected;
    }
  },

  methods: {
    handleToggled() {
      if (!this.search) {
        this.search = this.selected.text;
        this.toggled = !this.toggled;
      }
    },
    handleSelect(key) {
      const item = this.items.find(item => item.key === key)
      if (item) {
        this.value = item.key
        this.selectedItem = item

        this.hide()

        this.$emit("select", this.value)
      }
    },
    handleSearch() {
      this.needSearch = true;
    },
    hide() {
      this.search = ""
      this.needSearch = false
      this.toggled = false
    },
    reset() {
      this.$resetData()
    }
  },

  updated() {
    if (this.toggled) {
      this.$refs.search.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
$main-color: #e4e7ed;
$toggled-color: darken($main-color, 5%);
$hover-color: #f5f7fa;

.Select {
  width: 100%;
  position: relative;
  display: inline-block;
  font-size: 14px;
  color: #606266;

  &__main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 5px;
    border-radius: 5px;
    border: 1px solid $main-color;

    &:hover {
      border: 1px solid $toggled-color;
    }

    &-toggle {
      border: 1px solid $toggled-color;
    }

    &-title {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding: 0 5px;

      &-search {
        width: 100%;

        input {
          width: inherit;
          height: 20px;
          padding: 5px;
          margin: 0 -5px;
          border-radius: 5px;
          border: none;
          font-family: inherit;
          font-size: 100%;
          outline: none;
        }
      }

      &-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
    }
  }

  &__list {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    overflow: auto;
    z-index: 1;
    width: 100%;
    margin-top: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid $toggled-color;
    border-radius: 5px;

    &-item {
      padding: 12px 10px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      font-size: inherit;

      &:hover {
        background-color: $hover-color;
      }

      &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }

    &-show {
      display: block;
    }
  }
}
</style>
