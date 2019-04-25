<template>
  <ItemCard>

    <!-- <div>
      <div class="RailwayRequestsListItem__content">
        <div class="RailwayRequestsListItem__content-items">
          <div class="RailwayRequestsListItem__row">
            <RailwayRoute
              v-if="onlyFromStation"
              no-titles
              :station-from-name="row.stationFromName"
              :station-from-code="row.stationFromRWCode"
              :station-from-road="row.stationFromRoad"
            />

            <RailwayRoute
              v-else
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
          </div>

          <div class="RailwayRequestsListItem__row">
            <div class="RailwayRequestsListItem__row-item">
              <fa class="RailwayRequestsListItem__icon" icon="train"/>
              <span>{{ row.wagonsTypeName }}</span>
            </div>

            <div class="RailwayRequestsListItem__row-item">
              <fa class="RailwayRequestsListItem__icon" icon="box"/>
              <span>{{ row.goodsName }}</span>
            </div>

            <div class="RailwayRequestsListItem__row-item">
              <fa class="RailwayRequestsListItem__icon" icon="calendar-alt"/>
              <span>{{ `${row.periodFrom} - ${row.periodTo}` }}</span>
            </div>
          </div>
        </div>

        <div class="RailwayRequestsListItem__content-items">
          <div class="RailwayRequestsListItem__row RailwayRequestsListItem__mobile-margin">
            <div class="RailwayRequestsListItem__content-items-right-still RailwayRequestsListItem__content-items-right-line-still">
              <span class="RailwayRequestsListItem__number">{{ `№${row.number}` }}</span>
              <Status
                :color="row.status.color"
                :point-style="{ 'margin-right': 0, 'margin-left': '10px' }"
              />
            </div>
          </div>

          <div class="RailwayRequestsListItem__row RailwayRequestsListItem__row-small-margin">
            <div class="RailwayRequestsListItem__content-items-right RailwayRequestsListItem__content-items-right-line">
              <Company :name="row.companyName" name-only/>
            </div>
          </div>

          <div class="RailwayRequestsListItem__row RailwayRequestsListItem__row-small-margin">
            <div class="RailwayRequestsListItem__content-items-right RailwayRequestsListItem__content-items-right-line">
              <span class="RailwayRequestsListItem__content-items-right-line-item">
                {{ `${$t('forms.common.loadingRate')}: ${row.loadingRate}, ${$t('forms.common.loadingRatePtc')}` }}
              </span>

              <span class="RailwayRequestsListItem__content-items-right-line-item">
                {{ `${$t('forms.railwayAggregator.wagonsProposed')}: ${row.wagons}` }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="RailwayRequestListItem">
      <div class="RailwayRequestListItem__col">
        <RailwayRoute
          v-if="onlyFromStation"
          no-titles
          :station-from-name="row.stationFromName"
          :station-from-code="row.stationFromRWCode"
          :station-from-road="row.stationFromRoad"
        />

        <RailwayRoute
          v-else
          no-titles
          :station-from-name="row.stationFromName"
          :station-from-code="row.stationFromRWCode"
          :station-from-road="row.stationFromRoad"
          :station-to-name="row.stationToName"
          :station-to-code="row.stationToRWCode"
          :station-to-road="row.stationToRoad"
          :polygon-name="row.stationReferenceName"
          :polygon-code="row.stationReferenceRWCode"
          :polygon-number="row.polygonNumber"
        />

        <div class="RailwayRequestListItem__items-line">
          <div>
            <fa class="RailwayRequestListItem__icon" icon="train"/>
            <span>{{ row.wagonsTypeName }}</span>
          </div>

          <div>
            <fa class="RailwayRequestListItem__icon" icon="box"/>
            <span>{{ row.goodsName }}</span>
          </div>

          <div>
            <fa class="RailwayRequestListItem__icon" icon="calendar-alt"/>
            <span>{{ `${row.periodFrom} - ${row.periodTo}` }}</span>
          </div>
        </div>
      </div>

      <div class="RailwayRequestListItem__col">

        <div class="RailwayRequestListItem__items-line RailwayRequestListItem__items-line-still RailwayRequestListItem__no-icon">
          <span class="RailwayRequestListItem__number">
            {{ `№${row.number}` }}
          </span>

          <Status :color="row.status.color" :point-style="{ 'margin-right': 0, 'margin-top': '2px' }"/>
        </div>

        <Company class="RailwayRequestListItem__no-icon" :name="row.companyName" name-only/>

        <div class="RailwayRequestListItem__items-line">
          <span class="RailwayRequestListItem__no-icon">
            {{ `${$t('forms.common.loadingRate')}: ${row.loadingRate}` }}
          </span>
          <span class="RailwayRequestListItem__no-icon">
            {{ `${$t('forms.railwayAggregator.wagonsProposed')}: ${row.wagons}` }}
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

      <ButtonAddToBookmarks
        :currentlyInBookmarks="row.isFavorite"
        :handle-click="handleAddToBookmarksButton"
      />
    </div>

    <!-- <div slot="footer-left">
      <ButtonsGroup>
        <Button
          v-if="open"
          type="primary"
          @click="() => { open(row.guid) }">
          {{ $t('lists.open') }}
        </Button>

        <Button
          v-if="edit && !$_smallDeviceMixin_isDeviceSmall"
          type=""
          fa-icon="pen"
          icon-only
          edit
          style="margin-right: 10px"
          @click="() => { edit(row) }"/>
      </ButtonsGroup>
    </div> -->

    <!-- <div slot="footer-right-menu">
      <el-dropdown-item>
        <Button
          v-if="edit"
          fa-icon="pen"
          simple
          hover-underline
          @click="() => { edit(row) }">
          {{ $t('forms.common.edit') }}
        </Button>
      </el-dropdown-item>
    </div> -->

  </ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import Company from '@/components/Companies/Company'
import Button from '@/components/Common/Buttons/Button'
import RailwayRoute from '@/components/Common/Railway/RailwayRoute'
import ButtonAddToBookmarks from '@/components/Common/Buttons/ButtonAddToBookmarks'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-railway-request-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Status,
    Company,
    Button,
    RailwayRoute,
    ButtonAddToBookmarks
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    },
    onlyFromStation: Boolean
    // edit: {
    //   type: Function,
    //   default: null
    // }
  },

  computed: {
    to() {
      return this.demo
        ? this.$i18n.path(`railway-requests/${this.row.guid}`)
        : this.$i18n.path(`workspace/railway-requests/${this.row.guid}`)
    }
  },

  methods: {
    async handleAddToBookmarksButton() {
      if (this.row.isFavorite) {
        await this.$store.dispatch('railwayRequests/removeItemFromBookmarks', this.row.guid)
      } else {
        await this.$store.dispatch('railwayRequests/addToBookmarks', this.row.guid)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayRequestListItem {
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

.RailwayRequestListItem__items-line {
  display: flex;
  flex-direction: row;

  & > :not(:first-child) {
    margin-left: 20px;
  }
}

.RailwayRequestListItem__icon {
  margin-right: 6px;
  width: 15px;
}

.RailwayRequestListItem__no-icon {
  margin-left: 26px !important;
}

.RailwayRequestListItem__number {
  color: #FFD74D;
}

@media only screen and (max-width: 991px) {
  .RailwayRequestListItem {
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

  .RailwayRequestListItem__items-line {
    flex-direction: column;

    & > :not(:first-child) {
      margin-top: 25px;
      margin-left: 0;
    }

    &.RailwayRequestListItem__items-line-still {
      flex-direction: row;

      & > :not(:first-child) {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
}

// .RailwayRequestsListItem__left-item {
//   display: flex;
//   justify-content: flex-end;
// }

// .RailwayRequestsListItem__left-item-mobile {
//   display: flex;
//   justify-content: flex-start;
//   margin-top: 15px;
// }

// .RailwayRequestsListItem__icon {
//   margin-right: 10px;
//   width: 15px;
// }

// .RailwayRequestsListItem__number {
//   line-height: 1.5;
//   color: #FFD74D;
//   margin-left: 20px;
// }

// .RailwayRequestsListItem__row {
//   display: flex;
//   flex-direction: row;

//   &:not(:first-child) {
//     margin-top: 25px;
//   }

//   .RailwayRequestsListItem__row-item:not(:first-child) {
//     margin-left: 20px;
//   }

//   &.RailwayRequestsListItem__row-small-margin {
//     margin-top: 10px;
//   }
// }

// .RailwayRequestsListItem__content {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;

//   .RailwayRequestsListItem__title {
//     display: flex;
//     flex-direction: row;
//   }

//   .RailwayRequestsListItem__content-items {
//     display: flex;
//     flex-direction: column;

//     .RailwayRequestsListItem__content-items-right {
//       justify-content: flex-end;
//       align-items: flex-end;

//       &.RailwayRequestsListItem__content-items-right-top-big-screen {
//         margin-top: 20px;
//       }

//       &.RailwayRequestsListItem__content-items-right-line {
//         width: 100%;
//         display: flex;
//         flex-direction: row;

//         .RailwayRequestsListItem__content-items-right-line-item:not(:first-child) {
//           margin-left: 20px;
//         }
//       }
//     }

//     .RailwayRequestsListItem__content-items-right-still {
//       justify-content: flex-end;

//       &.RailwayRequestsListItem__content-items-right-line-still {
//         width: 100%;
//         display: flex;
//         flex-direction: row;

//         .RailwayRequestsListItem__content-items-right-line-item:not(:first-child) {
//           margin-left: 20px;
//         }
//       }
//     }
//   }
// }

// @media only screen and (max-width: 991px) {
//   .RailwayRequestsListItem__row {
//     flex-direction: column;

//     .RailwayRequestsListItem__row-item:not(:first-child) {
//       margin-left: 0;
//       margin-top: 25px;
//     }

//     &.RailwayRequestsListItem__row-small-margin {
//       margin-top: 25px;
//     }
//   }

//   .RailwayRequestsListItem__mobile-margin {
//     margin-top: 25px;
//   }

//   .RailwayRequestsListItem__content {
//     flex-direction: column;

//     .RailwayRequestsListItem__title {
//       flex-direction: column;
//     }

//     .RailwayRequestsListItem__content-items {

//       .RailwayRequestsListItem__content-items-right {
//         justify-content: flex-start;

//         &.RailwayRequestsListItem__content-items-right-top {
//           margin-top: 15px;
//         }

//         &.RailwayRequestsListItem__content-items-right-top-big-screen {
//           margin-top: 15px;
//         }

//         &.RailwayRequestsListItem__content-items-right-line {
//           flex-direction: column;
//           align-items: start;

//           .RailwayRequestsListItem__content-items-right-line-item:not(:first-child) {
//             margin-top: 25px;
//             margin-left: 0;
//           }
//         }
//       }

//       .RailwayRequestsListItem__content-items-right-still {
//         justify-content: flex-start;
//         align-items: flex-start;

//         &.RailwayRequestsListItem__content-items-right-line-still {
//           width: 100%;
//           display: flex;
//           flex-direction: row;

//           .RailwayRequestsListItem__content-items-right-line-item:not(:first-child) {
//             margin-left: 20px;
//           }
//         }
//       }
//     }
//   }

//   .RailwayRequestsListItem__number {
//     margin-left: 0;
//     // margin-top: 15px;
//   }
// }
</style>
