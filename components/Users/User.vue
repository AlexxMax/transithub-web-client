<template>
  <div class="User">
    <div class="User__title">
      <Tooltip
        effect="dark"
        placement="bottom"
        :content="username"
        :disabled="!avatarOnly || usernameOnly"
        :open-delay="1000"
      >
        <Avatar
          v-if="username && !usernameOnly"
          :size="avatarSize"
          :style="'margin-right: 5px'"
          :username="username || ' '" />
      </Tooltip>

      <p
        v-if="!avatarOnly"
        class="User__title-username"
        :style="{ 'height': avatarSize + 'px' }"
      >
        {{ username }}
      </p>
    </div>

    <ContactInfo
      v-if="email"
      class="User__contact-info"
      type="mail"
      :value="email"/>
    <ContactInfo
      v-if="phone"
      class="User__contact-info"
      type="phone"
      :value="phone"/>
  </div>
</template>

<script>
import Avatar from '@/components/Users/UserAvatar'
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
    username: String,
    email: String,
    phone: String,
    avatarSize: {
      type: Number,
      default: 40
    },
    avatarOnly: Boolean,
    usernameOnly: Boolean
  }
}
</script>

<style lang="scss" scoped>
.User {
  display: flex;
  flex-direction: column;

  .User__title {
    display: flex;
    flex-direction: row;

    .User__title-username {
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

  .User__contact-info {
    margin-top: 10px;
  }
}
</style>
