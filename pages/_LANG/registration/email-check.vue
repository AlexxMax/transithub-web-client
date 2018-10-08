<template>
  <div>
    <div class="th-wrapper">
        <Congratulations />
    </div>
  </div>
</template>

<script>
import Congratulations from "@/components/Registration/Congratulations";

export default {
  layout: "authorization",

  components: {
    Congratulations
  }
};
</script>

<style lang="scss" scoped>
.th-wrapper {
  min-height: calc(100vh - 250px - 250px);
}
</style>
