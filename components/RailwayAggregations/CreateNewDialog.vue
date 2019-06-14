<template>
  <div>
    <RailwayAggregationEditForm creation/>

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityRailwayAggregationsCreateWithoutCompany')"
      no-login-btn
      @close="close"
    >
      <Button
        style="margin-top: 30px"
        type="primary"
        round
        @click="handleCreateCompany"
      >
        {{ $t('links.navmenu.company.createNewCompany') }}
      </Button>
    </InaccessibleFunctionality>
  </div>
</template>

<script>
import RailwayAggregationEditForm from "@/components/RailwayAggregations/RailwayAggregationEditForm";
import InaccessibleFunctionality from "@/components/Common/InaccessibleFunctionality";
import Button from "@/components/Common/Buttons/Button";

export default {
  name: 'th-railway-aggregation-create-new-dialog',

  components: {
    RailwayAggregationEditForm,
    InaccessibleFunctionality,
    Button
  },

  computed: {
    showInaccessibleFunctionality:{
      get() {
        return this.$store.state.railwayAggregations.createNew
          .showInaccessibleFunctionality;
      },
      set(value) {
        this.$store.commit(
          "railwayAggregations/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
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
