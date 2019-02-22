<template>
  <div class="Company">
    <div class="Company__title">
      <Tooltip
        v-if="!nameOnly"
        effect="dark"
        placement="bottom"
        :content="name"
        :disabled="!avatarOnly"
        :open-delay="1000"
      >
        <Avatar
          v-if="name"
          :size="avatarSize"
          :style="'margin-right: 5px'"
          :name="name || ' '" />
      </Tooltip>

      <p
        v-if="!avatarOnly"
        class="Company__title-name"
        :style="companyTitleStyle"
      >
        {{ name }}
      </p>
    </div>

    <ContactInfo
      v-if="email"
      class="Company__contact-info"
      type="mail"
      :value="email"/>

    <ContactInfo
      v-if="phone"
      class="Company__contact-info"
      type="phone"
      :value="phone"/>
  </div>
</template>

<script>
import Avatar from '@/components/Companies/CompanyAvatar'
import ContactInfo from '@/components/Common/ContactInfo'
import Tooltip from '@/components/Common/Tooltip'

export default {
  name: 'th-company',

  components: {
    Avatar,
    ContactInfo,
    Tooltip
  },

  props: {
    name: String,
    email: String,
    phone: String,
    avatarSize: {
      type: Number,
      default: 40
    },
    avatarOnly: Boolean,
    nameOnly: Boolean
  },

  computed: {
    companyTitleStyle() {
      if (this.nameOnly) {
        return {}
      }
      return { 'height': this.avatarSize + 'px' }
    }
  }
}
</script>

<style lang="scss" scoped>
.Company {
  display: flex;
  flex-direction: column;
  justify-content: inherit;
  align-items: inherit;

  .Company__title {
    display: flex;
    flex-direction: row;
    justify-content: inherit;
    align-items: inherit;

    .Company__title-name {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
  }

  .Company__contact-info {
    margin-top: 10px;
    justify-content: inherit;
    align-items: inherit;
  }
}
</style>
