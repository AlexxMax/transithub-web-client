<template>
  <div class="th-form-drivers">
    <th-common-form>
      <th-form></th-form>
    </th-common-form>
  </div>
</template>

<script>
import Common from "@/components/Common/Form";
import Form from "@/components/DriversForm/Form";

export default {
  components: {
    "th-common-form": Common,
    "th-form": Form
  }
};
</script>