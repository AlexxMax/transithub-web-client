<template>
  <a
    rel="noopener"
    href="https://t.me/TH_support"
    target="_blank"
    :style="hrefStyle"
  >
    <Button
      type=""
      round
      external-resorse
      :flat="flat"
      :fa-icon="[ 'fas', 'question' ]"
      :style="{ 'width': wide ? '100%' : 'inherit' }"
    >
      {{ $t('forms.common.supportOnTelegram') }}
    </Button>
  </a>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-button-игззщке-telegram',

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
