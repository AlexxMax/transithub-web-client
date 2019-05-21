<template>
  <div class="OrganisationsList">
    <ListWrapper>
      <ItemsWrapper no-header width="760px">
        <Button
          round
          type="primary"
          fa-icon="plus"
          @click="handleCreateOrganisation"
          style="margin: 5px 0 5px 5px;"
        >
          {{ $t('forms.common.createNewOrganisation') }}
        </Button>

        <OrganisationsListItem
          v-for="item of organisations"
          :key="item.guid"
          :organisation="item"
          @open="handleOpenOrganisation(item)"
        />
      </ItemsWrapper>
    </ListWrapper>

    <OrganisationDilaog
      ref="organisation-dilaog"
      :organisation="organisation"
    />
  </div>
</template>

<script>
import Button from "@/components/Common/Buttons/Button";
import ListWrapper from "@/components/Common/Lists/ListWrapper";
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper";
import OrganisationsListItem from "@/components/Organisations/OrganisationsListItem";
import OrganisationDilaog from '@/components/Organisations/OrganisationDialog'

import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/organisations"

export default {
  name: "th-drivers-list",

  components: {
    Button,
    ListWrapper,
    ItemsWrapper,
    OrganisationsListItem,
    OrganisationDilaog
  },

  props: {
    organisations: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    organisation: {}
  }),

  methods: {
    handleOpenOrganisation(organisation) {
      this.organisation = organisation
      this.$refs['organisation-dilaog'].show()
    },
    handleCreateOrganisation() {
      this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`,
        {
          show: true,
          type: EDIT_DIALOG_TYPES.CREATE
        }
      )
    }
  }
};
</script>

<style lang="scss" scoped>
// .OrganisationsList {
//   margin-top: 12px;
// }
@media (max-width: 600px) {
  .OrganisationsList__title {
    width: 108%;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }
  .OrganisationsList__toolbar {
    margin-top: 50px;
    display: block;
    justify-content: center;
    align-items: center;
    margin-left: -7px;
  }
}
</style>
