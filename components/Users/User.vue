<template>
  <div class="User">
    <div class="User__title">
      <Avatar
        v-if="username"
        :style="'margin-right: 5px'"
        :username="username || ' '" />

      <p class="User__title-username">
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

export default {
  name: 'th-company',

  components: {
    Avatar,
    ContactInfo
  },

  props: {
    username: String,
    email: String,
    phone: String
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
      height: 40px;
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
