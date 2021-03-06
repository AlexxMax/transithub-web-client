<template>
  <div class="ContactInfo" v-if="value">
    <fa v-if="!noIcon" :icon="icon"/>
    <a v-if="show || opened" class="ContactInfo__value" :href="href" :target="target">{{ value }}</a>
    <span v-else class="ContactInfo__value" @click="showValue">{{ title }}</span>
  </div>
</template>

<script>
import { CONTACT_INFO_TYPES as TYPES } from '@/utils/constants'

export default {
  name: 'th-contact-info',

  props: {
    value: String,
    type: {
      type: String,
      default: 'mail'
    },
    opened: Boolean,
    noIcon: Boolean
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
    href() {
      let hrefType = ''
      if (this.type === TYPES.phone) {
        hrefType = 'tel:'
      } else if (this.type === TYPES.telegram) {
        hrefType = 'tg:'
      } else if (this.type === TYPES.mail) {
        hrefType = 'mailto:'
      }

      let href = this.value
      if (this.type === TYPES.phone) {
        href = this.value.replace('+', '').replace('(', '').replace(')', '').replace(/ /g, '')
      } else if (this.type === TYPES.telegram) {
        href = `//resolve?domain=${this.value}`
      } else if (this.type === TYPES.facebook && !this.value.includes('http://www.facebook.com/')) {
        href = `http://www.facebook.com/${this.value}`
      } else if (this.type === TYPES.webpage && !(this.value.includes('https://') || this.value.includes('http://'))) {
        href = `https://${this.value}`
      }

      return `${hrefType}${href}`
    },
    target() {
      return this.type === TYPES.facebook || this.type === TYPES.webpage ? '_blank' : ''
    },
    icon() {
      if (this.type === TYPES.mail) {
        return 'at'
      } else if (this.type === TYPES.telegram) {
        return ['fab', 'telegram-plane']
      } else if (this.type === TYPES.facebook) {
        return ['fab', 'facebook-square']
      } else if (this.type === TYPES.webpage) {
        return 'globe'
      }
      return 'phone'
    },
    title() {
      if (this.type === TYPES.mail) {
        return this.$t('forms.common.showEmail')
      } else if (this.type === TYPES.telegram) {
        return this.$t('forms.common.showTelegram')
      } else if (this.type === TYPES.facebook) {
        return this.$t('forms.common.showFacebook')
      } else if (this.type === TYPES.webpage) {
        return this.$t('forms.common.showWebpage')
      }
      return this.$t('forms.common.showPhone')
    }
  },

  methods: {
    showValue() {
      this.show = true
    },
    hideValue() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ContactInfo {
  color: #606266;
  background-color: #f8f8f8;
  border-radius: 5px;
  padding: 5px 8px;
  width: fit-content;
  cursor: pointer;
  transition: .5s;

  &:hover {
    // background-color: #FFD74D;
    background-color: rgb(235, 235, 235);
    // color: white;
  }

  .ContactInfo__value {
    color: inherit;
    margin-left: 8px;
    text-decoration: none;
  }
}
</style>
