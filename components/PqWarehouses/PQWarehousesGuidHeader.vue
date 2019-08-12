<template>
<div class="PQWarehousesGuidHeader">

  <ButtonAddToBookmarks
    :currentlyInBookmarks="true"
    :handle-click="handleClickAddToBookmarks"
  />

  <Button
    round
    type="primary"
    v-for="(button, index) in buttons"
    :key="index"
    @click="button.function"
  >{{ button.text }}</Button>

</div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import ButtonAddToBookmarks from '@/components/Common/Buttons/ButtonAddToBookmarks'

export default {
  components: {
    Button,
    ButtonAddToBookmarks
  },

  data() {
    return {

      buttons: [{
          text: this.$t('forms.pqWarehouses.item.buttonParking'),
          function: this.handleClickParking
        },
        {
          text: this.$t('forms.pqWarehouses.item.buttonQueue'),
          function: this.handleClickQueue
        },
        {
          text: this.$t('forms.pqWarehouses.item.buttonChange'),
          function: this.handleClickEdit
        }
      ]

    }
  },

  methods: {
    handleClickAddToBookmarks() {},
    handleClickParking() {
      this.$emit('openParking')
    },
    handleClickQueue() {},
    handleClickEdit() {
      this.$emit('openPattern')
    },
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesGuidHeader {
  @include for-extra-small {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    button {
      margin: 0;

      &:not(:last-child) {
        margin: 0 .5rem .5rem 0;
      }
    }
  }
}
</style>
