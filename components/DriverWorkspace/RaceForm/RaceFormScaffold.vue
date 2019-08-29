<template>
  <div class="RaceFormScaffold">
    <Top
      :title="title"
      :subtitle="subtitle"
      :percentage="percentage"
      @close="$emit('close')"
    />

    <div class="RaceFormScaffold__content">
      <slot/>
    </div>

    <BottomButtons :buttons="buttons"/>
  </div>
</template>

<script>
import Top from '@/components/DriverWorkspace/RaceForm/RaceFormTop'
import BottomButtons from '@/components/DriverWorkspace/RaceForm/RaceFormBottomButtons'

export default {
  name: 'th-driver-workspace-race-form-scaffold',

  components: { Top, BottomButtons },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
  },
}
</script>

<style lang='scss' scoped>
$nav-size: 237px;

.RaceFormScaffold {
  border-left: $--driver-workspace-border;
  border-right: $--driver-workspace-border;

  @include for-extra-small {
    border-left: none;
    border-right: none;
  };

  &__content {
    background-color: $--driver-workspace-scaffold-background;
    min-height: calc(100vh - #{$nav-size});
    padding: {
      top: $--driver-workspace-padding;
      bottom: $--driver-workspace-padding;
    };
  }
}
</style>
