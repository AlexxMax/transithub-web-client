<template>
  <div>
    <nuxt-link
      class="FormPillLink"
      :to="to">

      <Status
        class="FormPillLink__status-color" :color="color"/>
      {{ title }}
    </nuxt-link>
  </div>
</template>

<script>
import Status from '@/components/Common/FormElements/Constituents/Status'

export default {
  name: 'th-form-pill-link',

  components: { Status },

  props: {
    to: String,
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.FormPillLink {
  width: fit-content;
  text-decoration: none;
  margin-top: 20px;
  padding: 5px 10px;
  display: flex;
  //flex-direction: column;
  color: inherit;
  font-size: 14px;
  font-weight: 400;
  border-radius: 50px;
  background-color: #f1ede3;
    
  &:hover {
    cursor: pointer;
    opacity: .8;
  }

  &__status-color {
    margin-top: -2px;
  }
}
</style>