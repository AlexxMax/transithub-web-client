<template>
  <div class="Company">
    <div class="Company__title">
      <el-tooltip
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
      </el-tooltip>

      <p
        v-if="!avatarOnly"
        class="Company__title-name"
        :style="{ 'height': avatarSize + 'px' }"
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

export default {
  name: 'th-company',

  components: {
    Avatar,
    ContactInfo
  },

  props: {
    name: String,
    email: String,
    phone: String,
    avatarSize: {
      type: Number,
      default: 40
    },
    avatarOnly: Boolean
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
      height: 40px;
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
