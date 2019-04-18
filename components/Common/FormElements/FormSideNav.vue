<template>
  <div class="FormSideNav">
    <div class="FormSideNav__header">
      <BackButton/>
      <span class="FormSideNav__header__title">{{ title }}</span>
    </div>

    <div class="FormSideNav__content">
      <slot/>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/Common/FormElements/Constituents/BackButton'

export default {
  name: 'th-form-side-nav',

  components: { BackButton },

  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.FormSideNav {
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  border-right: 1px solid #EBEEF5;
  padding: 30px;
  width: 20vw;
  max-width: 250px;
  height: calc(100% - 60px);

  &__header {
    display: flex;
    flex-direction: row;
    margin-bottom: 45px;

    &__title {
      font-size: 16px;
      font-weight: 500;
    }
  }

  &__content {
    margin: 0 30px;
  }
}

@media only screen and (max-width: 991px) {
  .FormSideNav {
    width: 100%;
    max-width: 100%;
    height: fit-content;

    &__content {
      // margin: 0 auto;
    }
  }
}
</style>
