<template>
  <div>
    <ListWrapper
      :loading="loading"
      :list-is-empty="list.length === 0"
      :empty-list-title="$t('lists.organisationsEmptyList')">

      <OrganisationsListItem
        v-for="item of list"
        :key="item.guid"
        :organisation="item"
        :company-guid="companyGuid"
        @open="handleOpenOrganisation(item)"
      />
    </ListWrapper>

    <OrganisationDilaog
      ref="organisation-dilaog"
      :organisation="organisation"
    />
  </div>
</template>

<script>
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import OrganisationsListItem from "@/components/Organisations/OrganisationsListItem"
import OrganisationDilaog from '@/components/Organisations/OrganisationDialog'

export default {
  name: "th-organisation-subordinate-list",

  components: {
    ListWrapper,
    OrganisationsListItem,
    OrganisationDilaog
  },

  props: {
    companyGuid: String,
    // instantFillUp: Boolean
  },

  data() {
    return {
      fetched: false,
      organisation: {}
    }
  },

  computed: {
    list() {
      return this.$store.getters["organisations/getSubordinateList"](
        this.companyGuid
      )
    },
    loading() {
      return this.$store.state.organisations.subordinateListLoading
    }
  },

  methods: {
    handleOpenOrganisation(organisation) {
      this.organisation = organisation
      this.$refs['organisation-dilaog'].show()
    },

    // async fetch() {
    //   await this.$store.dispatch(
    //     "organisations/fetchSubordinateList",
    //     this.companyGuid
    //   )
    // },
    // async fillUp() {
    //   if (!this.fetched) {
    //     await this.fetch();
    //     this.fetched = true;
    //   }
    // }
  },

  // async created() {
  //   if (this.instantFillUp) {
  //     await this.fillUp();
  //   }
  // }
};
</script>
