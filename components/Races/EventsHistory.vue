<template>
  <RightView
    :visible="visible"
    :title="$t('forms.race.events')"
    @close="$emit('close')">

    test

  </RightView>
</template>

<script>
import RightView from '@/components/Common/RightView'

export default {
  name: 'th-race-events-history',

  components: {
    RightView
  },

  props: {
    visible: Boolean
  }
}
</script>
