<template>
  <div class="OrganisationWidget">
    <OrganisationAvatar :name="name"/>
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
}
</style>
