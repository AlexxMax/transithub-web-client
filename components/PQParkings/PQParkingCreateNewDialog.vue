<template>
  <div>
    <PQParkingEditDialog creation/>

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityParkingsCreateWithoutCompany')"
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
import PQParkingEditDialog from "@/components/PQParkings/PQParkingEditDialog";
import InaccessibleFunctionality from "@/components/Common/InaccessibleFunctionality";
import Button from "@/components/Common/Buttons/Button";

import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS } from "@/utils/pq.parkings"

export default {
  name: "th-pq-parking-create-new-dialog",

  components: {
    PQParkingEditDialog,
    InaccessibleFunctionality,
    Button
  },

  computed: {
    showInaccessibleFunctionality: {
      get() {
        return this.$store.state[STORE_MODULE_NAME].editing
          .showInaccessibleFunctionalityDialog;
      },
      set(value) {
        this.$store.commit(
          `${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY}`,
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
