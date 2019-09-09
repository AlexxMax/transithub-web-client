<template>
  <div class="text-center">
    <Button
      type="primary"
      :label="$t('forms.common.loadMore')"
      :processing="loading"
      @click.native="$emit('click')"
    />
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/RoundButton'

export default {
  name: 'th-list-load-more',

  components: { Button },

  props: {
    loading: Boolean,
  },
}
</script>
