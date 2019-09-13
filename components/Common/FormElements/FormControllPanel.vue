<template>
  <div>
    <div
      class="py-4 flex justify-between items-center border-b border-gray-200"
      :class="{ 'px-4': embed, 'px-6': !embed }"
    >
      <ButtonBack v-if="showBack" style="margin-bottom: 0px"/>
      <Tabs embed :tabs="tabs" :active-tab="activeTab"/>
      <Toolbar :buttons="buttons" :show-close="showClose" @close="$emit('close')"/>
    </div>

    <Tabs :tabs="tabs" :active-tab="activeTab"/>
  </div>
</template>

<script>
import ButtonBack from '@/components/Common/FormElements/Constituents/ButtonBack'
import Toolbar from '@/components/Common/FormElements/FormToolbar'
import Tabs from '@/components/Common/Tabs'

export default {
  name: 'th-form-controll-panel',

  components: { ButtonBack, Toolbar, Tabs },

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
