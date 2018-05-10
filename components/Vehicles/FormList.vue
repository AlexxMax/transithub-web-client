<template>
  <div class="th-list-vehicles">
    <th-common-list>
      <th-list></th-list>
    </th-common-list>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import List from "@/components/Vehicles/List";

export default {
  components: {
    "th-common-list": CommonList,
    "th-list": List
  }
};
</script>

<style lang="scss" scoped>
// .th-list-drivers {
//   margin-left: 60px;
// }
</style>
