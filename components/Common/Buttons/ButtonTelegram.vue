<template>
  <a
    rel="noopener"
    href="https://t.me/TH_agregator"
    target="_blank"
    :style="hrefStyle"
  >
    <Button
      type=""
      round
      external-resorse
      :flat="flat"
      :fa-icon="[ 'fab', 'telegram-plane' ]"
      :style="{ 'width': wide ? '100%' : 'inherit' }"
    >
      {{ $t('forms.common.subscribeToPageOnTelegram') }}
    </Button>
  </a>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-button-telegram',

  components: {
    Button
  },

  props: {
    flat: Boolean,
    wide: Boolean
  },

  computed: {
    hrefStyle() {
      return {
        'width': this.flat ? '100%' : 'fit-content'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-left: 10px;
}
</style>

