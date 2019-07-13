<template>
  <div>
    <div v-if="filtersList.length > 0" class="FastFilters">
      <Tag
        class="FastFilters__item"
        v-for="{ key, id, value, title } of filtersList"
        :key="id"
        editable
        :value="title"
        @close="handleRemove(key, id)"
      />

      <Button
        type="danger"
        size="mini"
        round
        plain
        @click="handleClearAll"
      >{{ $t('lists.filters.clear') }}</Button>
    </div>
  </div>
</template>

<script>
var _isEqual = require('lodash.isequal');

import Tag from "@/components/Common/Tag";
import Button from "@/components/Common/Buttons/Button";

import { findFilterTitle } from "@/utils/filters";

export default {
  name: "th-lists-fast-filters",

  components: { Tag, Button },

  props: {
    filters: {
      type: Object,
      required: true
    },
    filtersInit: Object
  },

  computed: {
    filtersList() {
      let list = [];
      Object.keys(this.filters).forEach(filterKey => {
        if (filterKey === "author" || filterKey === "periodTo" || filterKey === "income") {
          return;
        }

        if (_isEqual(this.filters[filterKey], this.filtersInit[filterKey])) {
          return;
        }

        const filterValue = this.filters[filterKey];
        if (filterKey === "statuses") {
          list = [
            ...list,
            ...filterValue.map(filterValueElement => ({
              key: filterKey,
              id: filterValueElement,
              value: filterValueElement,
              title: findFilterTitle(
                filterValueElement,
                this.$store.state.railwayStatuses.list
              )
            }))
          ];
        } else if (Array.isArray(filterValue)) {
          list = [
            ...list,
            ...filterValue.map(filterValueElement => ({
              key: filterKey,
              id: filterValueElement.id,
              value: filterValueElement.value,
              title: filterValueElement.title
            }))
          ];
        } else if (
          filterKey === "periodFrom" &&
          filterValue &&
          this.filters["periodTo"]
        ) {
          const dateFrom = new Date(filterValue);
          const dateTo = new Date(this.filters["periodTo"]);

          if (
            Object.prototype.toString.call(dateFrom) === "[object Date]" &&
            Object.prototype.toString.call(dateTo) === "[object Date]"
          ) {
            list.push({
              key: "period",
              id: "period",
              title: `${dateFrom.pFormatDate()}-${dateTo.pFormatDate()}`,
              value: filterValue
            });
          }
        } else if (
          filterKey === 'distanceFrom' &&
          filterValue &&
          this.filters['distanceTo']
        ) {
          list.push({
            key: 'distance',
            id: 'distance',
            title: `${filterValue} - ${this.filters['distanceTo']}`,
            value: filterValue.toString()
          })
        } else if (filterValue && filterKey !== 'distanceTo') {
          list.push({
            key: filterKey,
            id: `${filterValue}`,
            title: filterValue,
            value: filterValue
          });
        }
      });
      return list;
    }
  },

  methods: {
    handleRemove(key, id) {
      const filterValue = this.filters[key];
      if (Array.isArray(filterValue) && key !== 'statuses') {
        this.$emit(
          "set-filter",
          key,
          filterValue.filter(filterValueElement => filterValueElement.id !== id)
        );
      } else if (Array.isArray(filterValue) && key === 'statuses') {
        this.$emit(
          "set-filter",
          key,
          filterValue.filter(filterValueElement => filterValueElement !== id)
        );
      } else if (key === 'distance') {
        this.$emit("set-filter", 'distanceFrom', null);
        this.$emit("set-filter", 'distanceTo', null);
      } else {
        this.$emit("set-filter", key, null);
      }
    },
    handleClearAll() {
      this.$emit("clear-all");
    }
  }
};
</script>

<style lang='scss' scoped>
.FastFilters {
  margin: -5px 5px 10px;

  &__item {
    margin: 5px 10px 0 0;
  }
}
</style>
