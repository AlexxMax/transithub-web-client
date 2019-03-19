<template>
  <div class="SubscriptionSavedItem">
    <div class="SubscriptionSavedItem__tags">
      <Tags :tags="tags"/>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/Common/Tags'

export default {
  name: 'th-filters-menu-saved-item',

  components: {
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
