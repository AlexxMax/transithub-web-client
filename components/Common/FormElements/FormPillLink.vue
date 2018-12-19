<template>
  <div>
    <nuxt-link
      class="FormPillLink"
      :to="to">{{ title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'th-form-pill-link',

  props: {
    to: String,
    title: {
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
  margin: 20px 0 0 -10px;
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
}
</style>