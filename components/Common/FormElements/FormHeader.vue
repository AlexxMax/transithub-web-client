<template>
  <div class="FormHeader">
    <BackButton :tooltip="backButtonTooltip" :to="backButtonTo" />
    <Title :title="title" />
    <Status :title="statusTitle" :color="statusColor" />
  </div>
</template>

<script>
import BackButton from '@/components/Common/FormElements/Constituents/BackButton'
import Title from '@/components/Common/FormElements/Constituents/MainTitle'
import Status from '@/components/Common/FormElements/Constituents/Status'

export default {
  name: 'th-form-header',

  components: {
    BackButton,
    Title,
    Status
  },

  props: {
    title: {
      type: String,
      required: true
    },
    statusTitle: {
      type: String,
      reguired: true
    },
    statusColor: {
      type: String,
      required: true
    },
    backButtonTooltip: {
      type: String,
      required: true
    },
    backButtonTo: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.FormHeader {
  display: flex;
  flex-direction: row;
  // margin-bottom: 20px;
}
</style>
