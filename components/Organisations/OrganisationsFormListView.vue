<template>
  <div>
    <p class="OrganisationsFormListView__list-title">{{ $t('forms.organisation.organisations') }}</p>

     <div class="OrganisationsFormListView__list-toolbar">
      <Button
        round
        type="primary"
        fa-icon="plus"
        @click="handleCreateOrganisation"
        style="margin: 5px 0 5px 5px;"
        >
        {{ $t('forms.common.createNewOrganisation') }}
        </Button>
    </div>

    <div v-loading="organisationsLoading">
      <SubordinateList :company-guid="companyGuid"/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Common/Buttons/Button"
import SubordinateList from "@/components/Organisations/SubordinateList"

import {
  STORE_MODULE_NAME as ORGANISATIONS_STORE_MODULE_NAME,
  ACTIONS_KEYS as ORGANISATIONS_ACTIONS_KEYS
} from '@/utils/organisations'

import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES,
  EDIT_DIALOG_SOURCES
} from "@/utils/organisations"

export default {
  name: 'th-organisations-form-list-view',

  components: {
    Button,
    SubordinateList
  },

  props: {
    companyGuid: {
      type: String,
      required: true
    }
  },

  computed: {
    organisationsLoading() {
      return this.$store.state[ORGANISATIONS_STORE_MODULE_NAME].subordinateListLoading
    }
  },

  methods: {
    handleCreateOrganisation() {
      this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`,
        {
          show: true,
          type: EDIT_DIALOG_TYPES.CREATE,
          source: EDIT_DIALOG_SOURCES.SUBORDINATE
        }
      )
    }
  }
}
</script>

<style lang='scss' scoped>
.OrganisationsFormListView {
  &__list {
    &-title {
      font-weight: 500;
    }

    &-toolbar {
      margin: {
        bottom: 20px;
      }
    }
  }
}

</style>
