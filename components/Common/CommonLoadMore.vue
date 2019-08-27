<template>
<div
  v-if="list && list.length < count"
  :class="['CommonLoadMore', { 'CommonLoadMore--vertical': vertical }]"
>

  <div class="CommonLoadMore__text">
    <span>{{ `${$t('forms.common.loaded')}: ${list.length + 1}/${count}` }}</span>
  </div>

  <Button
    round
    type="primary"
    :loading="loading"
    :disabled="disabled"
    @click="onLoadMore"
  >{{ $t('forms.common.loadMore') }}</Button>

</div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    Button
  },

  props: {
    list: {
      type: Array,
      default: () => null
    },
    count: {
      type: [Number, String],
      default: null
    },
    onLoadMore: {
      type: Function,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.CommonLoadMore {
    margin-top: 1rem;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    text-align: center;

    &__text {
      margin-right: 1rem;
    }

    &--vertical {
      flex-direction: column;

      &__text {
        margin: 0;
      }
    }
}
</style>
