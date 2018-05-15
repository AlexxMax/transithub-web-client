<template>
  <div class="th-list-vehicles">
    <th-common-list :count="count">
      <th-list :vehicles="vehicles"></th-list>
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
  },
  computed: {
    vehicles: function() {
      return this.$store.state.vehicles.list;
    },
    count: function() {
      return this.$store.state.vehicles.count;
    }
  }
};
</script>

<style lang="scss" scoped>
// .th-list-drivers {
//   margin-left: 60px;
// }
</style>
