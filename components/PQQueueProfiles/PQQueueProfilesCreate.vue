<template>
  <div>
    <Edit :embed="embed"/>

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityQueueProfileCreateWithoutCompany')"
      :embed="embed"
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
import Edit from '@/components/PQQueueProfiles/PQQueueProfilesEdit'
import InaccessibleFunctionality from "@/components/Common/InaccessibleFunctionality";
import Button from "@/components/Common/Buttons/Button";

import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS } from "@/utils/pq.queueProfiles"

export default {
  name: 'th-pq-queue-profile-create-new-dialog',

  components: {
    Edit,
    InaccessibleFunctionality,
    Button
  },

  props: {
    embed: Boolean
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
}
</script>
