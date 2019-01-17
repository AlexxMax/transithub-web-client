<template>
  <ItemCard>

    <div class="RailwayAggregationListItem">
      <div class="RailwayAggregationListItem__col">
        <RailwayRoute
          no-titles
          :station-from-name="row.stationFromName"
          :station-from-code="row.stationFromRWCode"
          :station-from-road="row.stationFromRoad"
          :station-to-name="row.stationToName"
          :station-to-code="row.stationToRWCode"
          :station-to-road="row.stationToRoad"
          :polygon-name="row.polygonName"
          :polygon-code="row.polygonRWCode"
          :polygon-number="row.polygonNumber"
        />

        <div class="RailwayAggregationListItem__items-line">
          <div>
            <fa class="RailwayAggregationListItem__icon" icon="train"/>
            <span>{{ row.wagonsAffilationName }}</span>
          </div>

          <div>
            <fa class="RailwayAggregationListItem__icon" icon="box"/>
            <span>{{ row.goodsName }}</span>
          </div>

          <div>
            <fa class="RailwayAggregationListItem__icon" icon="calendar-alt"/>
            <span>{{ `${row.periodFrom} - ${row.periodTo}` }}</span>
          </div>
        </div>
      </div>

      <div class="RailwayAggregationListItem__col">

        <div class="RailwayAggregationListItem__items-line RailwayAggregationListItem__items-line-still RailwayAggregationListItem__no-icon">
          <span class="RailwayAggregationListItem__number">
            {{ `№${row.number}` }}
          </span>

          <Status :color="row.status.color" :point-style="{ 'margin-right': 0, 'margin-top': '2px' }"/>
        </div>

        <Company class="RailwayAggregationListItem__no-icon" :name="row.companyName" name-only/>

        <div class="RailwayAggregationListItem__items-line">
          <span class="RailwayAggregationListItem__no-icon">
            {{ `${$t('forms.railwayAggregator.wagonsDeficit')}: ${row.wagonsDeficit}` }}
          </span>
          <span class="RailwayAggregationListItem__no-icon">
            {{ `${$t('forms.common.propositions')}: ${row.requestsCount}` }}
          </span>
        </div>
      </div>
    </div>

    <div slot="footer-left">
      <Button
        v-if="open"
        type="primary"
        round
        @click="() => { open(row.guid) }">
        {{ $t('lists.open') }}
      </Button>

      <nuxt-link v-else :to="to">
        <Button round type="primary">{{ $t('lists.open') }}</Button>
      </nuxt-link>
    </div>

  </ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import Button from '@/components/Common/Buttons/Button'
import Company from '@/components/Companies/Company'
import RailwayRoute from '@/components/Common/Railway/RailwayRoute'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-railway-aggregation-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Status,
    Button,
    Company,
    RailwayRoute
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    },
    demo: Boolean
  },

  computed: {
    to() {
      return this.demo
        ? this.$i18n.path(`railway-aggregations/${this.row.guid}`)
        : this.$i18n.path(`workspace/railway-aggregations/${this.row.guid}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayAggregationListItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__col {
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
      align-items: flex-end;

      & > :not(:first-child) {
        margin-top: 12px;
      }
    }

    & > :not(:first-child) {
      margin-top: 25px;
    }
  }
}

.RailwayAggregationListItem__items-line {
  display: flex;
  flex-direction: row;

  & > :not(:first-child) {
    margin-left: 20px;
  }
}

.RailwayAggregationListItem__icon {
  margin-right: 6px;
  width: 15px;
}

.RailwayAggregationListItem__no-icon {
  margin-left: 26px !important;
}

.RailwayAggregationListItem__number {
  color: #FECD34;
}

@media only screen and (max-width: 991px) {
  .RailwayAggregationListItem {
    flex-direction: column;

    & > :not(:first-child) {
      margin-top: 25px;

      & > :not(:first-child) {
        margin-top: 25px;
      }
    }

    &__col:not(:first-child) {
      align-items: flex-start;
    }
  }

  .RailwayAggregationListItem__items-line {
    flex-direction: column;

    & > :not(:first-child) {
      margin-top: 25px;
      margin-left: 0;
    }

    &.RailwayAggregationListItem__items-line-still {
      flex-direction: row;

      & > :not(:first-child) {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
}
</style>
