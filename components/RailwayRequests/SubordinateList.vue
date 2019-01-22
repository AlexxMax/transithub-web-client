<template>
  <div>
    <List no-toolbar no-pagination>
      <!-- <SubordinateListToolbar :title="title">
        <Button type="primary" @click="handleCreateProposition">
          {{ $t('forms.railwayRequest.createProposition') }}
        </Button>
      </SubordinateListToolbar> -->

      <!-- <div class="RailwayRequestsSubordinateList__subtitle">
        {{ subtitle }}
      </div> -->

      <ListWrapper
        style="margin-top: 15px"
        :loading="loading"
        :list-is-empty="list.length === 0"
        :empty-list-title="$t('lists.emptyList')">

        <ListItem
          v-for="rr of list"
          only-from-station
          :key="rr.guid"
          :row="rr"
          :open="handleOpenRailwayRequest"
          :edit="editMethod(rr)"/>

      </ListWrapper>
    </List>

    <RailwayRequestEditForm
      v-if="!demo"
      ref="edit-form"
      :creation="createdNewRailwayRequest"
      :parend-id="aggregation"
      :parent-goods="aggregationGoods"
      :parent-wagons-type="aggregationWagonsType"
      :parent-station-from="aggregationStationFrom"
      :parent-polygon-r-w-code="aggregationStationReferenceRWCode"
      :parent-polygon-id="aggregationPolygonId"
      :parent-polygon-name="aggregationStationReferenceName"
      :data-in="railwayRequestToEdit"/>

    <FastView
      subordinate
      :visible="railwayRequestVisible"
      :guid="railwayRequestGuid"
      :aggregation-guid="aggregation"
      @close="handleCloseRailwayRequest"
      :show-more-button-visible="!demo"
    />

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityRailwayAggregationsCreateRequest')"
    />

    <InaccessibleFunctionality
      ref="inaccessible-functionality-no-company"
      :text="$t('forms.common.inaccessibleFunctionalityRailwayAggregationsCreateRequestWithoutCompany')"
      no-login-btn
    >
      <Button
        class="RailwayRequestsSubordinateList__inaccessible-functionality-btn"
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
// import SubordinateListToolbar from '@/components/Common/Lists/SubordinateListToolbar'
import List from '@/components/Common/List'
import Button from '@/components/Common/Buttons/Button'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ListItem from '@/components/RailwayRequests/ListItem'
import RailwayRequestEditForm from '@/components/RailwayRequests/RailwayRequestsEditForm'
import FastView from '@/components/RailwayRequests/FastView'
import InaccessibleFunctionality from '@/components/Common/InaccessibleFunctionality'

export default {
  name: 'th-railway-requests-subordinate-list',

  components: {
    // SubordinateListToolbar,
    List,
    Button,
    ListWrapper,
    ListItem,
    RailwayRequestEditForm,
    FastView,
    InaccessibleFunctionality
  },

  props: {
    aggregation: {
      type: [ Number, String ],
      required: true
    },
    aggregationGoods: [ Number, String ],
    aggregationWagonsType: [ Number, String ],
    aggregationStationFrom: [ Number, String ],
    aggregationStationReferenceRWCode: [ Number, String ],
    aggregationPolygonId: Number,
    aggregationStationReferenceName: String,
    demo: Boolean
  },

  data() {
    return {
      loading: false,
      railwayRequestVisible: false,
      railwayRequestGuid: null,
      railwayRequestToEdit: null,
      createdNewRailwayRequest: true
    }
  },

  computed: {
    list() {
      return this.$store.getters['railwayRequests/getSubordinateList'](this.aggregation)
    },
    // title() {
    //   return `${this.$t('forms.railwayRequest.propositions')} (${this.requestsCount})`
    // },
    // subtitle() {
    //   return `${this.$t('forms.railwayRequest.partisipantsCount')} (${this.partisipantsCount})`
    // },
    // partisipantsCount() {
    //   return this.$store.state.railwayAggregations.item.partisipantsCount || 0
    // },
    // requestsCount() {
    //   return this.$store.state.railwayAggregations.item.requestsCount || 0
    // },
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid
    }
  },

  methods: {
    async fetch() {
      this.loading = true
      await this.$store.dispatch('railwayRequests/fetchSubordinateList', this.aggregation)
      this.loading = false
    },
    createNewAggregationProposition() {
      this.handleCreateProposition()
    },
    handleCreateProposition() {
      if (this.demo) {
        this.$refs['inaccessible-functionality'].show()
      } else if (!this.userHasCompany) {
        this.$refs['inaccessible-functionality-no-company'].show()
      } else {
        this.createdNewRailwayRequest = true
        this.$refs['edit-form'].show()
      }
    },
    handleOpenRailwayRequest(railwayRequestGuid) {
      this.railwayRequestGuid = railwayRequestGuid
      this.railwayRequestVisible = true
    },
    handleCloseRailwayRequest() {
      this.railwayRequestVisible = false
      this.railwayRequestGuid = null
    },
    handleEditRailwayRequest(railwayRequest) {
      this.railwayRequestToEdit = railwayRequest
      this.createdNewRailwayRequest = false
      this.$refs['edit-form'].show()
    },
    editMethod(row) {
      const userCanEdit = this.$rights.railwayRequests.userCanEdit(row.authorGuid)
      if (this.demo || !userCanEdit) {
        return null
      }
      return this.handleEditRailwayRequest
    },
    handleCreateCompany() {
      this.$store.dispatch('companies/showCreateNewDialog', true)
      this.$refs['inaccessible-functionality-no-company'].hide()
    }
  },

  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.RailwayRequestsSubordinateList__subtitle {
  color: #606266;
}

.RailwayRequestsSubordinateList__inaccessible-functionality-btn {
  margin-top: 30px;
}
</style>
