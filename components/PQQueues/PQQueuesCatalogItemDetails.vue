<template>
  <div>
    <span class="font-bold text-3xl">{{ item.name }}</span>
    <div
      v-if="item.comment !== '-'"
      class="text-gray-700"
    >
      {{ item.comment }}
    </div>

    <div class="mt-5">
      <div class="lg:flex lg:content-start lg:flex-wrap lg:justify-start">
        <FormField
          class="lg:mr-10"
          v-for="(item, index) in meta"
          :key="index"
          :title="item.title"
          :value="item.text"
        />
      </div>

      <FormField
        :title="$t('forms.common.pqQueueProfile')"
      >
        <nuxt-link 
          class="PQQueuesCatalogItemDetails__profile-link"
          :to="$i18n.path(`workspace/pq-queue-profiles/${item.profileGuid}`)"
        >
          {{ item.profileName }}
        </nuxt-link>
      </FormField>
    </div>
  </div>
</template>

<script>
import FormField from '@/components/Common/FormElements/FormField'

import {
  DIRECTIONS,
  PRIORITIES,
  LOADING_TYPES
} from '@/utils/pq.queues'

export default {
  name: 'th-pq-queues-catalog-item-details',

  components: { FormField },

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  computed: {
    loadingDirection() {
      const queueDirection = this.item.direction
      if (queueDirection === DIRECTIONS.UNLOADING)
        return this.$t('forms.queue.unloading')
      else
        return this.$t('forms.queue.loading')

      return queueDirection
    },

    loadingType() {
      const queueLoadingType = this.item.loadingType
      if (queueLoadingType === LOADING_TYPES.MOUND)
        return this.$t('forms.queue.mound')
      else
        return this.$t('forms.queue.pouring')

      return queueLoadingType
    },

    meta() {
      return [{
          title: this.$t('forms.queue.direction'),
          text: this.item.direction ? this.loadingDirection : '-'
        },
        {
          title: this.$t('forms.queue.loadingType'),
          text: this.item.loadingType ? this.loadingType : '-'
        },
        {
          title: this.$t('forms.queue.entryRatio'),
          text: this.item.outputRatio > 0 ? this.item.outputRatio : '-'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.PQQueuesCatalogItemDetails__profile-link {
  color: $--main-text-color;
  text-decoration: underline;
  cursor: pointer;
  transition: .3s ease-in;

  &:hover {
    color: $--color-primary;
  }
}
</style>
