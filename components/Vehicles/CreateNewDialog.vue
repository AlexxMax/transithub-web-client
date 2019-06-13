<template>
  <div>
    <VehicleEditDialog creation/>

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityVehiclesCreateWithoutCompany')"
      no-login-btn
    >
      <Button
        style="margin-top: 30px"
        type="primary"
        round
        @click="handleCreateCompany"
      >{{ $t('links.navmenu.company.createNewCompany') }}</Button>
    </InaccessibleFunctionality>
  </div>
</template>

<script>
import VehicleEditDialog from "@/components/Vehicles/VehicleEditDialog";
import InaccessibleFunctionality from "@/components/Common/InaccessibleFunctionality";
import Button from "@/components/Common/Buttons/Button";

export default {
  name: "th-driver-create-new-dialog",

  components: {
    VehicleEditDialog,
    InaccessibleFunctionality,
    Button
  },

  computed: {
    showInaccessibleFunctionality() {
      return this.$store.state.vehicles.editing
        .showInaccessibleFunctionalityDialog;
    }
  },

  methods: {
    handleCreateCompany() {
      this.$store.commit(
        "vehicles/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
        false
      );
      this.$store.dispatch("companies/showCreateNewDialog", true);
    }
  },

  watch: {
    showInaccessibleFunctionality() {
      const inaccessibleFunctionality = this.$refs[
        "inaccessible-functionality"
      ];
      if (this.showInaccessibleFunctionality) {
        inaccessibleFunctionality.show();
      } else {
        inaccessibleFunctionality.hide();
      }
    }
  }
};
</script>