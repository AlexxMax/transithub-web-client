<template>
  <div class="FiltersSavedItem">
    <Card>
      <div class="FiltersSavedItem__tags">
        <Tags :tags="tags"/>
      </div>

      <ButtonsGroup class="FiltersSavedItem__btns">
        <Button type="danger" round plain @click="$emit('remove-filters')">
          {{ $t('forms.common.remove') }}
        </Button>

        <Button type="primary" round @click="$emit('set-filters')">
          {{ $t('forms.common.perform') }}
        </Button>
      </ButtonsGroup>

      <Button
        class="FiltersSavedItem__subscription_btn"
        round
        plain
        :fa-icon="subscriptionLoader ? null : 'bolt'"
        type="success"
        :loading="subscriptionLoader"
        @click="$emit('change-subscription')"
      >
        {{ subscriptionButtonTitle }}
      </Button>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Common/Card'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import Button from '@/components/Common/Buttons/Button'
import Tags from '@/components/Common/Tags'

export default {
  name: 'th-filters-menu-saved-item',

  components: {
    Card,
    ButtonsGroup,
    Button,
    Tags
  },

  props: {
    labels: Array,
    isSubscription: Boolean,
    subscriptionLoader: Boolean
  },

  computed: {
    tags() {
      return this.labels.map(item => ({ value: item }))
    },
    subscriptionButtonTitle() {
      return this.isSubscription ? this.$t('forms.common.unsubscribeToUpdates') : this.$t('forms.common.subscribeToUpdates')
    }
  }
}
</script>

<style lang='scss' scoped>
.FiltersSavedItem {
  margin: {
    top: 10px;
    bottom: 10px;
  };

  &__tags {
    margin: {
      bottom: 25px;
    };
  }

  &__btns {
    justify-content: center;

    & > * {
      width: 100%;
    }
  }

  &__subscription_btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
