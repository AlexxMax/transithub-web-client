<template>
  <div class="flex">
    <Button
      v-for="button of allButtons"
      class="ml-2"
      :key="button.name"
      :transparent="button.transparent"
      :fa-icon="button.icon"
      :tooltip="button.tooltip"
      @click="button.handler"
    />
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/RoundButton'

export default {
  name: 'th-form-toolbar',

  components: { Button },

  props: {
    buttons: Array,
    showClose: Boolean
  },

  computed: {
    allButtons() {
      const allButtons = [ ...this.buttons ]
      if (this.showClose) {
        allButtons.push({
          name: '_close',
          transparent: true,
          icon: 'times',
          tooltip: this.$t('forms.common.close'),
          handler: () => this.$emit('close')
        })
      }
      return allButtons
    },
  },
}
</script>
