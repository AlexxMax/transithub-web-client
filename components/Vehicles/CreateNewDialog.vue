<template>
  <div>
    <VehicleEditDialog creation/>

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityVehiclesCreateWithoutCompany')"
      no-login-btn
      @close="close"
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
  name: "th-vehicle-create-new-dialog",

  components: {
    VehicleEditDialog,
    InaccessibleFunctionality,
    Button
  },

  computed: {
    showInaccessibleFunctionality: {
      get() {
        return this.$store.state.vehicles.editing
          .showInaccessibleFunctionalityDialog;
      },
      set(value) {
        this.$store.commit(
          "vehicles/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
          value
        );
      }
    }
  },

  methods: {
    handleCreateCompany() {
      this.showInaccessibleFunctionality = false
      this.$store.dispatch("companies/showCreateNewDialog", true);
    },

    close() {
      this.showInaccessibleFunctionality = false
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
