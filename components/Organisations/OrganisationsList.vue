<template>
  <div class="OrganisationsList">
    <CommonList
      no-pagination
      show-load-more
      loading="$store.state.organisations.loading"
      count="$store.state.organisations.count"
      loaded-count="$store.state.organisations.list.length"
      store-mutation="MUTATIONS_KEYS.SET_OFFSET"
      store-module="organisations"
      offset-name="offset"
      @eventFetch="$emit('fetch')"
    >
      <ListWrapper>
        <ItemsWrapper no-header width="750px">
          <Button
            round
            type="primary"
            fa-icon="plus"
            @click="$store.dispatch('companies/showCreateNewDialog', true)"
            style="margin: -20px 10px 15px 7px;"
          >{{ $t('forms.common.createNewOrganisation') }}</Button>
          <OrganisationsListItem
            v-for="item of organisations"
            :key="item.name"
            :name="item.name"
            :fullname="item.fullname"
            :edrpou="item.edrpou"
          />
        </ItemsWrapper>
      </ListWrapper>
    </CommonList>
  </div>
</template>

<script>
// import ToolbarRight from "@/components/Common/Lists/ToolbarRight";
import CommonList from "@/components/Common/List";
import Button from "@/components/Common/Buttons/Button";
import ListWrapper from "@/components/Common/Lists/ListWrapper";
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper";
import OrganisationsListItem from "@/components/Organisations/OrganisationsListItem";
// import { mapState } from "vuex";

// import { MUTATIONS_KEYS } from "@/utils/drivers";

export default {
  name: "th-drivers-list",

  components: {
    // ToolbarRight,
    CommonList,
    Button,
    ListWrapper,
    ItemsWrapper,
    OrganisationsListItem
  },
  // props: {
  //   organisations: {
  //     type: Array,
  //     required: true
  //   }
  // },
  // computed: mapState(["organisations"]),
  data() {
    return {
      organisations: [
        {
          name: "Kernel Green",
          fullname: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          fullname: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          fullname: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          fullname: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          fullname: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        }
      ]
    };
  },

  // data: () => ({
  //   MUTATIONS_KEYS
  // }),

  methods: {
    handleSearch(value) {}
  }
};
</script>

<style lang="scss" scoped>
.OrganisationsList {
  margin-top: 50px;
}
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
