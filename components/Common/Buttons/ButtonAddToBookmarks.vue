<template>
  <Tooltip :content="label" :disabled="flat">
    <Button
      v-if="!flat"
      circle
      icon-only
      :fa-icon="icon"
      :type="null"
      :loading="loading"
      :class="{'ButtonAddToBookmarks__btn--loading': loading }"
      @click="handleButtonClick"
    />

    <Button
      v-else
      type=""
      :fa-icon="icon"
      round
      flat
      :loading="loading"
      @click="handleButtonClick"
    >
      {{ label }}
    </Button>
  </Tooltip>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Tooltip from '@/components/Common/Tooltip'

export default {
  name: 'th-button-add-to-bookmarks',

  components: {
    Button,
    Tooltip
  },

  props: {
    currentlyInBookmarks: Boolean,
    flat: Boolean,
    handleClick: {
      type: Function,
      required: true
    }
  },

  data: () => ({
    loading: false
  }),

  computed: {
    label() {
      return this.currentlyInBookmarks ? this.$t('forms.common.removeFromBookmarks') : this.$t('forms.common.addToBookmarks')
    },
    icon() {
      return this.loading ? null : (this.currentlyInBookmarks ? ['fas', 'bookmark'] : ['far', 'bookmark'])
    }
  },

  methods: {
    async handleButtonClick() {
      this.loading = true
      await this.handleClick()
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.ButtonAddToBookmarks__btn--loading [class*="el-icon-"] + span {
  margin-left: 0 !important;
}
</style>
