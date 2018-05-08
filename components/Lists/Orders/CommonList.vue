<template>
  <div>
    <th-list-orders></th-list-orders>
    <th-list></th-list>
  </div>
</template>

<script>
import WrapperList from "@/components/Lists/WrapperList";
import Orders from "@/components/Lists/Orders/Orders";

export default {
  components: {
    "th-list": WrapperList,
    "th-list-orders": Orders
  }
};
</script>
