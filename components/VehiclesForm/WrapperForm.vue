<template>
  <div class="th-form-vehicles">
    <th-common-form>
      <th-form></th-form>
      <th-footer></th-footer>
    </th-common-form>
  </div>
</template>

<script>
import Common from "@/components/Common/Form";
import Footer from "@/components/Common/FormFooter";
import Form from "@/components/VehiclesForm/Form";

export default {
  components: {
    "th-common-form": Common,
    "th-footer": Footer,
    "th-form": Form
  }
};
</script>