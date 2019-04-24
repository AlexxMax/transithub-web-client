<template>
  <div class="ContactInfoGroup">
    <div v-if="show">
      <ContactInfo
        v-for="(ci, index) of values"
        :key="`${index}-${new Date()}`"
        :value="ci"
        :type="type"
        opened
      />
    </div>

    <div
      v-else
      class="ContactInfoGroup__values"
      @click="showValues"
    >
      <fa :icon="icon"/>
      {{ title }}
    </div>
  </div>
</template>

<script>
import ContactInfo from '@/components/Common/ContactInfo'

import { CONTACT_INFO_TYPES as TYPES } from '@/utils/constants'

export default {
  name: 'th-contact-info-group',

  components: { ContactInfo },

  props: {
    values: Array,
    type: {
      type: String,
      default: 'mail'
    }
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
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
      return this.$t('forms.common.showPhones')
    }
  },

  methods: {
    showValues() {
      this.show = true
    }
  }
}
</script>

<style lang='scss' scoped>
.ContactInfoGroup {

  &__values {
    color: #606266;
    background-color: #f8f8f8;
    border-radius: 5px;
    padding: 5px 8px;
    width: fit-content;
    cursor: pointer;
    transition: .5s;

    &:hover {
      background-color: rgb(235, 235, 235);
    }

    *:first-child {
      margin-right: 8px;
    }
  }
}
</style>
