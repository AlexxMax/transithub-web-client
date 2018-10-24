<template>
  <div :style="{ 'margin-left': leftMargin }">

    <div v-if="flat" class="FiltersMenu__btn-flat" @click="openMenu">
      <fa icon="filter"/>
      <span class="FiltersMenu__btn-title">
        {{ `${$t('lists.filter')}${filterSet ? ': ' + $t('lists.set') : ''}` }}
      </span>
    </div>

    <Button v-else type="" @click="openMenu">
      <fa icon="filter"/>
      <span class="FiltersMenu__btn-title">
        {{ `${$t('lists.filter')}${filterSet ? ': ' + $t('lists.set') : ''}` }}
      </span>
    </Button>

    <RightView
      :visible="menuVisible"
      :title="$t('lists.filter')"
      @close="closeMenu">
      <Button
        type="text"
        size="mini"
        :disabled="!filterSet"
        style="margin-bottom: 15px"
        @click="$emit('clear-filters')">
        {{ $t('lists.filters.clear') }}
      </Button>

      <slot/>

    </RightView>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'

export default {
  name: 'th-filters-menu',

  components: {
    Button,
    RightView
  },

  props: {
    filterSet: Boolean,
    flat: Boolean
  },

  data() {
    return {
      menuVisible: false,
      leftMargin: '0px'
    }
  },

  methods: {
    openMenu() {
      this.menuVisible = true
      this.$emit('open')
    },
    closeMenu() {
      this.menuVisible = false
      this.$emit('close')
    }
  },

  mounted() {
    if (this.$parent.$el.className === 'ButtonsGroup' || this.$parent.$parent.$el.className === 'ButtonsGroup') {
      this.leftMargin = '5px'
    }
  }
}
</script>

<style lang="scss" scoped>
.FiltersMenu__btn-flat {
  cursor: pointer;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  border-radius: 5px;

  &:hover {
    background-color: #f8f8f8;
  }
}

.FiltersMenu__btn-title {
  margin-left: 5px;
}
</style>
