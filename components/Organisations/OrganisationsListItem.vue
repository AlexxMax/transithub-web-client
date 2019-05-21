<template>
  <ItemCard>
    <OrganisationAvatar :name="organisation.name"/>
    <div class="OrganisationsListItem">
      <div class="OrganisationsListItem__col">
        <span class="OrganisationsListItem__name">{{organisation.name}}</span>
        <span class="OrganisationsListItem__form">{{organisation.fullname}}</span>
        <span
          class="OrganisationsListItem__code"
        >{{ $t('forms.company.common.edrpou') }}: {{organisation.edrpou}}</span>
      </div>
    </div>
    <div class="DriversListItem__footer" slot="footer-left">
      <Button
        round
        type="primary"
        size="small"
        @click="$emit('open')"
      >
        {{ $t('lists.open') }}
      </Button>

      <Button
        circle
        icon-only
        fa-icon="pen"
        :type="null"
        @click="handleEditButton"
      />

      <Button
        :class="{ 'OrganisationsListItem__btn--loading': deleteLoading }"
        circle
        icon-only
        :fa-icon="icon"
        :type="null"
        :loading="deleteLoading"
        @click="handleDeleteOrganisation"
      />
    </div>
  </ItemCard>
</template>

<script>
import OrganisationAvatar from "@/components/Organisations/OrganisationAvatar";
import ItemCard from "@/components/Common/Lists/ItemCard";
import Button from "@/components/Common/Buttons/Button";

import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS, EDIT_DIALOG_TYPES } from '@/utils/organisations'

export default {
  name: "th-organisations-list-item",

  components: {
    OrganisationAvatar,
    ItemCard,
    Button
  },

  props: {
    organisation: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    deleteLoading: false
  }),

  computed: {
    icon() {
      return this.deleteLoading ? null : 'trash-alt'
    }
  },

  methods: {
    handleEditButton() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_ITEM}`, this.organisation)
      this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`,
        {
          show: true,
          type: EDIT_DIALOG_TYPES.EDIT
        }
      )

      this.dialogFormVisible = false
    },

    async handleDeleteOrganisation() {
      this.$confirm(this.$t('messages.deleteOrganisation'), this.$t('forms.common.deleting'), {
        confirmButtonText: this.$t('forms.common.yes'),
        cancelButtonText: this.$t('forms.common.no'),
        type: 'warning'
      }).then(async () => {
        this.deleteLoading = true

        await this.$store.dispatch(
          `${STORE_MODULE_NAME}/${ACTIONS_KEYS.REMOVE_ITEM}`,
          {
            companyGuid: this.$store.state.companies.currentCompany.guid,
            organisationGuid: this.organisation.guid
          }
        )

        this.deleteLoading = false

        this.$message({
          type: 'success',
          message: this.$t('messages.deleteOrganisationConfirm').replace('%1', this.organisation.name)
        });
      })
    }
  }
};
</script>

<style lang="scss">
.OrganisationsListItem {
  margin: {
    top: 10px;
    bottom: 10px;
    right: 5px;
    left: 5px;
  };

  &__col {
    display: flex;
    flex-direction: column;
    margin-left: 67px;
    margin-top: -60px;
  }

  &__name {
    font-size: 14px;
    font-weight: 500;
  }

  &__form {
    margin-top: 3px;
    font: {
      size: 12px;
    };
    color: #909399;
  }

  &__code {
    margin-top: 10px;
    font: {
      size: 10px;
    };
    color: #909399;
  }

  &__btn--loading [class*="el-icon-"] + span {
    margin-left: 0 !important;
  }
}
</style>
