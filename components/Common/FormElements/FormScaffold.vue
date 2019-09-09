<template>
  <div
    class="-m-20px bg-white lg:rounded-lg lg:m-0 lg:shadow"
  >
    <ControllPanel
      :buttons="buttons"
      :tabs="tabs"
      :active-tab="activeTab"
      :show-back="showBack"
      :show-close="showClose"
      :embed="embed"
      @close="$emit('close')"
    />

    <div class="px-6 py-5">
      <slot/>
    </div>
  </div>
</template>

<script>
import ControllPanel from '@/components/Common/FormElements/FormControllPanel'

export default {
  name: 'th-form-scaffold',

  components: { ControllPanel },

  props: {
    buttons: Array,
    tabs: Array,
    activeTab: String,
    showBack: Boolean,
    showClose: Boolean,
    embed: Boolean,
  },
}
</script>
