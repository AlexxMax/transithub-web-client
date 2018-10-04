<template>
  <div class="ContactInfo">
    <fa :icon="icon"/>
    <a v-if="show" class="ContactInfo__value" :href="`${hrefType}:${value}`">{{ value }}</a>
    <span v-else class="ContactInfo__value" @click="showValue">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'th-contact-info',

  props: {
    value: {
      type: String,
      required: true
    },
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
    hrefType() {
      if (this.type === 'phone') {
        return 'tel'
      }
      return 'mailto'
    },
    icon() {
      if (this.type === 'mail') {
        return 'at'
      }
      return 'phone'
    },
    title() {
      if (this.type === 'mail') {
        return this.$t('forms.common.showEmail')
      }
      return this.$t('forms.common.showPhone')
    }
  },

  methods: {
    showValue() {
      this.show = true
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

  &:hover {
    // background-color: #FECD34;
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
