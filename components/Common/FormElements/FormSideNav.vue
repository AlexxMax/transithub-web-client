<template>
<div class="FormSideNav">

  <div class="FormSideNav__header">
    <ButtonBack :text="title" />
  </div>

  <div class="FormSideNav__content">
    <slot />
  </div>

</div>
</template>

<script>
import ButtonBack from '@/components/Common/FormElements/Constituents/ButtonBack'

export default {
  name: "th-form-side-nav",

  components: { ButtonBack },

  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang='scss' scoped>
.FormSideNav {
    width: 20vw;
    max-width: 250px;
    height: calc(100% - 60px);

    padding: 2.75rem 2rem;

    display: flex;
    flex-direction: column;

    background-color: #f7f7f7;
    border-right: 1px solid #ebeef5;

    @include for-small-and-less {
        padding: 1rem 2;
    }

    @include for-extra-small {
        padding: 1rem;
    }

    &__header {
        display: flex;
        flex-direction: row;
        margin-bottom: 3rem;

        @media (max-width: 991px) {
          margin-bottom: 2rem;
        }

        &__title {
            font-size: 16px;
            font-weight: 500;
        }
    }

    &__content {
        margin: 0 2rem;
    }
}

@media only screen and (max-width: 991px) {
    .FormSideNav {
        width: auto;
        max-width: 100%;

        &__content {
            margin: 0;
        }
    }
}
</style>
