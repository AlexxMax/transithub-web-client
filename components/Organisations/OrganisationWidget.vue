<template>
  <div class="OrganisationWidget">
    <OrganisationAvatar
      class="OrganisationWidget__avatar"
      :name="name"
    />
    <span>{{ name }}</span>
  </div>
</template>

<script>
import OrganisationAvatar from '@/components/Organisations/OrganisationAvatar'

export default {
  name: 'th-organisation-widget',

  components: { OrganisationAvatar },

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.OrganisationWidget {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__avatar {
    margin-right: 10px;
  }
}
</style>
