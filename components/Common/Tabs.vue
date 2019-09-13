<template>
  <div class="flex justify-center" :class="classes">
    <Tab
      v-for="tab in tabs"
      :key="tab.name"
      :embed="embed"
      :title="tab.title"
      :active="activeTab === tab.name"
      @click="() => tab.handler(tab)"
    />
  </div>
</template>

<script>
import Tab from '@/components/Common/Tab'

export default {
  name: 'th-tabs',

  components: { Tab },

  props: {
    tabs: Array,
    activeTab: String,
    embed: Boolean,
  },

  computed: {
    classes() {
      return {
        'invisible': this.embed,
        'lg:visible': this.embed,
        'lg:invisible': !this.embed,
        'lg:h-0': !this.embed,
        'lg:my-0': !this.embed,
      }
    }
  }
}
</script>
