<template>
<div :class="['ListsLoadMore', { 'ListsLoadMore--count': list && count } ]">

  <span
    class="ListsLoadMore__text"
    v-if="list && count"
  >{{ `${$t('forms.common.loaded')}: ${list.length}/${count}` }}</span>

  <Button
    :loading="loading"
    class="ListsLoadMore__btn"
    @click="onLoadMore"
    round
    type="primary"
    :disabled="disabled"
  >{{ $t('forms.common.loadMore') }}</Button>

</div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'lists-load-more',

  components: {
    Button
  },

  props: {
    disabled: Boolean,
    loading: Boolean,
    onLoadMore: {
      type: Function,
      required: true
    },
    list: {
      type: Array,
      default: () => null
    },
    count: {
      type: [Number, String],
      default: null
    },
  }
}
</script>

<style lang='scss' scoped>
.ListsLoadMore {
    margin: 10px;

    text-align: center;

    &--count {
        margin-top: 1rem;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        text-align: center;
    }

    &__btn {
        padding: 10px 20px;
    }

    &__text {
        margin-right: 1rem;

        display: block;
    }
}
</style>
