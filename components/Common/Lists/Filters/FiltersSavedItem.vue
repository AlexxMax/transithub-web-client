<template>
  <div class="FiltersSavedItem">
    <Card>
      <div class="FiltersSavedItem__tags">
        <Tags :tags="tags"/>
      </div>

      <ButtonsGroup class="FiltersSavedItem__btns">
        <Button type="danger" plain @click="$emit('remove-filters')">
          {{ $t('forms.common.remove') }}
        </Button>

        <Button type="primary" @click="$emit('set-filters')">
          {{ $t('forms.common.perform') }}
        </Button>
      </ButtonsGroup>
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
    labels: Array
  },

  computed: {
    tags() {
      return this.labels.map(item => ({ value: item }))
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
}
</style>
