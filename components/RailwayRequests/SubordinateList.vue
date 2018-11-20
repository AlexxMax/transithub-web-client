<template>
  <div>
    <SubordinateListToolbar :title="title">
      <Button type="primary" @click="handleCreateProposition">{{ $t('forms.railwayRequest.createProposition') }}</Button>
    </SubordinateListToolbar>

    <div class="RailwayRequestsSubordinateList__subtitle">
      {{ subtitle }}
    </div>

    <ListWrapper
      style="margin-top: 15px"
      :loading="loading"
      :list-is-empty="list.length === 0"
      :empty-list-title="$t('lists.emptyList')">

      <ListItem
        v-for="rr of list"
        :key="rr.guid"
        :row="rr"
        :open="handleOpenRailwayRequest"
        :edit="handleEditRailwayRequest"/>

    </ListWrapper>

    <RailwayRequestEditForm
      ref="edit-form"
      :creation="createdNewRailwayRequest"
      :parend-id="aggregation"
      :data-in="railwayRequestToEdit"/>

    <FastView
      subordinate
      :visible="railwayRequestVisible"
      :guid="railwayRequestGuid"
      :aggregation-guid="aggregation"
      @close="handleCloseRailwayRequest"/>
  </div>
</template>

<script>
import SubordinateListToolbar from '@/components/Common/Lists/SubordinateListToolbar'
import Button from '@/components/Common/Buttons/Button'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ListItem from '@/components/RailwayRequests/ListItem'
import RailwayRequestEditForm from '@/components/RailwayRequests/RailwayRequestsEditForm'
import FastView from '@/components/RailwayRequests/FastView'

export default {
  name: 'th-railway-requests-subordinate-list',

  components: {
    SubordinateListToolbar,
    Button,
    ListWrapper,
    ListItem,
    RailwayRequestEditForm,
    FastView
  },

  props: {
    aggregation: {
      type: [ Number, String ],
      required: true
    }
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
    title() {
      return `${this.$t('forms.railwayRequest.propositions')} (${this.requestsCount})`
    },
    subtitle() {
      return `${this.$t('forms.railwayRequest.partisipantsCount')} (${this.partisipantsCount})`
    },
    partisipantsCount() {
      return this.$store.state.railwayAggregations.item.partisipantsCount || 0
    },
    requestsCount() {
      return this.$store.state.railwayAggregations.item.requestsCount || 0
    }
  },

  methods: {
    async fetch() {
      this.loading = true
      await this.$store.dispatch('railwayRequests/fetchSubordinateList', this.aggregation)
      this.loading = false
    },
    handleCreateProposition() {
      this.createdNewRailwayRequest = true
      this.$refs['edit-form'].show()
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
</style>
