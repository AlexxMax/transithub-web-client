<template>
  <div>
    <th-list-vehicles></th-list-vehicles>
    <th-list></th-list>
  </div>
</template>

<script>
import WrapperList from "@/components/Lists/WrapperList";
import Vehicles from "@/components/Lists/Vehicles/Vehicles";

export default {
  components: {
    "th-list": WrapperList,
    "th-list-vehicles": Vehicles
  }
};
</script>
