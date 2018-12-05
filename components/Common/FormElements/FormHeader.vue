<template>
  <div class="FormHeader">
    <div class="FormHeader__container">
      <div class="FormHeader__title">
        <BackButton v-if="!noBackButton"/>
        <Title :title="title"/>
      </div>
      <Status
        class="FormHeader__status"
        :title="statusTitle"
        :color="statusColor"
        :editable="editableStatus"
        @edit="$emit('edit-status')"
      />
    </div>

    <div :class="{ 'FormHeader__subtitle': true, 'FormHeader__subtitle-no-back-btn': noBackButton }">
      <slot/>
    </div>
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
    noBackButton: Boolean,
    editableStatus: Boolean
  }
}
</script>

<style lang="scss" scoped>
.FormHeader {
  display: flex;
  flex-direction: column;

  .FormHeader__container {
    display: flex;
    flex-direction: row;

    .FormHeader__title {
      display: flex;
      flex-direction: row;
    }

    .FormHeader__status {
      margin-left: 20px;
    }
  }

  .FormHeader__subtitle {
    margin-left: 32px;

    &.FormHeader__subtitle-no-back-btn {
      margin-left: 0;
    }
  }
}

@media only screen and (max-width: 991px) {
  .FormHeader {
    .FormHeader__container {
      display: flex;
      flex-direction: column;

      .FormHeader__status {
        margin-top: 5px;
        margin-left: 0;
      }
    }

    .FormHeader__subtitle {
      margin-left: 0;
    }
  }
}
</style>
