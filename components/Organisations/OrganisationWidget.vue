<template>
  <div class="OrganisationWidget">
    <OrganisationAvatar :name="name"/>
    <span class="OrganisationWidget__title">{{ name }}</span>
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

  &__title {
    // font-size: 16px;
    margin-left: 5px;
  }
}
</style>
