<template>
  <div>
    <th-list-drivers></th-list-drivers>
    <th-list></th-list>
  </div>
</template>

<script>
import WrapperList from "@/components/Lists/WrapperList";
import Drivers from "@/components/Lists/Drivers/Drivers";

export default {
  components: {
    "th-list": WrapperList,
    "th-list-drivers": Drivers
  }
};
</script>
