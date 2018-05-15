<template>
  <div class="th-list-drivers">
    <th-common-list :count="count">
      <th-list :drivers="drivers"></th-list>
    </th-common-list>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import List from "@/components/Drivers/List";

export default {
  components: {
    "th-common-list": CommonList,
    "th-list": List
  },
  computed: {
    drivers: function() {
      return this.$store.state.drivers.list;
    },
    count: function() {
      return this.$store.state.drivers.count;
    }
    // limit: function() {
    //   return this.$store.state.drivers.limit;
    // }
  }
};
</script>

<style lang="scss" scoped>
// .th-list-drivers {
//   margin-left: 60px;
// }
</style>
