<template>
  <div>
    <ButtonsGroup class="FiltersAllList__btns">
      <Button
        round
        plain
        :type="null"
        :disabled="!filterSet"
        @click="$emit('clear-filters')"
      >
        {{ $t('lists.filters.clear') }}
      </Button>

      <Button
        round
        v-if="useSave"
        :loading="btnSaveLoading"
        type="primary"
        :disabled="!filterSet"
        @click="$emit('save-filters')"
      >
        {{ $t('forms.common.save') }}
      </Button>
    </ButtonsGroup>

    <div
      class="FiltersAllList__filters"
      :class="{
        'FiltersAllList__filters-height-small': !bigHeight && scroll,
        'FiltersAllList__filters-height-big': bigHeight && scroll
      }"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-filters-menu-filters-all-list',

  components: {
    ButtonsGroup,
    Button
  },

  props: {
    filterSet: Boolean,
    bigHeight: Boolean,
    useSave: Boolean,
    btnSaveLoading: Boolean,
    scroll: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='scss' scoped>
.FiltersAllList__btns {
  margin: 10px 0 15px 0; 

  & > * {
    width: 100%;
  }
}

.FiltersAllList__filters {
  overflow-y: auto;

  &.FiltersAllList__filters-height-small {
    height: calc(100vh - 100px);
  }

  &.FiltersAllList__filters-height-big {
    height: calc(100vh - 160px);
  }
}
</style>
