<template>
  <div class="ListsLoadMore">
    <Button
      :loading="loading"
      class="ListsLoadMore__btn"
      @click="onLoadMore"
      round
      type="primary"
      :disabled="disabled"
    >
      <!-- <fa icon="sync-alt"/> -->
      {{ $t('forms.common.loadMore') }}
    </Button>
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
    }
  }
}
</script>

<style lang='scss' scoped>
.ListsLoadMore {
  text-align: center;
  margin: 10px;

  &__btn {
    padding: 10px 20px;
    // font-size: 14px;
  }
}
</style>
