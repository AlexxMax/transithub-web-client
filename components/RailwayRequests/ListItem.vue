<template>
  <ItemCard>

    <div>
      <div class="RailwayRequestsListItem__content">
        <div class="RailwayRequestsListItem__content-items">
          <div class="RailwayRequestsListItem__title">
            <div>
              <fa class="RailwayRequestsListItem__icon" icon="calendar-alt"/>
              <span>{{ `${row.periodFrom} - ${row.periodTo}` }}</span>
            </div>
            <span class="RailwayRequestsListItem__number">{{ `№${row.number}` }}</span>
          </div>
        </div>

        <div class="RailwayRequestsListItem__content-items">
          <div class="RailwayRequestsListItem__content-items-right RailwayRequestsListItem__content-items-right-top">
            <Status
              :title="$t(row.status.localeKey)"
              :color="row.status.color"/>
          </div>
        </div>
      </div>

      <div class="RailwayRequestsListItem__content">
        <div class="RailwayRequestsListItem__content-items">
          <div class="RailwayRequestsListItem__row">
            <RailwayStation
              :name="row.stationFromName"
              :road="row.stationFromRoad"
              :rwCode="row.stationFromRWCode"/>
          </div>

          <div class="RailwayRequestsListItem__row">
            <div>
              <fa class="RailwayRequestsListItem__icon" icon="train"/>
              <span>{{ `${row.wagons}, ${row.wagonsTypeName}` }}</span>
            </div>
          </div>

          <div class="RailwayRequestsListItem__row">
            <div>
              <fa class="RailwayRequestsListItem__icon" icon="box"/>
              <span>{{ row.goodsName }}</span>
            </div>
          </div>
        </div>

        <div class="RailwayRequestsListItem__content-items">
          <div class="RailwayRequestsListItem__row">
            <div class="RailwayRequestsListItem__content-items-right">
              <Company :name="row.companyName"/>
            </div>

            <div class="RailwayRequestsListItem__content-items-right RailwayRequestsListItem__content-items-right-top-big-screen">
              <User username-only :username="row.userFullname"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div slot="footer-left">
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
    </div>

    <div slot="footer-right-menu">
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
    </div>

  </ItemCard>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import RailwayStation from '@/components/Common/Railway/RailwayStation'
import Company from '@/components/Companies/Company'
import User from '@/components/Users/User'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-railway-request-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Status,
    RailwayStation,
    Company,
    User,
    Button,
    ButtonsGroup
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    },
    edit: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayRequestsListItem__left-item {
  display: flex;
  justify-content: flex-end;
}

.RailwayRequestsListItem__left-item-mobile {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
}

.RailwayRequestsListItem__icon {
  margin-right: 10px;
  width: 15px;
}

.RailwayRequestsListItem__number {
  color: #FECD34;
  margin-left: 20px;
}

.RailwayRequestsListItem__row {
  margin-top: 15px;
}

.RailwayRequestsListItem__content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .RailwayRequestsListItem__title {
    display: flex;
    flex-direction: row;
  }

  .RailwayRequestsListItem__content-items {
    display: flex;
    flex-direction: column;

    .RailwayRequestsListItem__content-items-right {
      justify-content: flex-end;
      align-items: flex-end;

      &.RailwayRequestsListItem__content-items-right-top-big-screen {
        margin-top: 20px;
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .RailwayRequestsListItem__content {
    flex-direction: column;

    .RailwayRequestsListItem__title {
      flex-direction: column;
    }

    .RailwayRequestsListItem__content-items .RailwayRequestsListItem__content-items-right {
      justify-content: flex-start;
      align-items: flex-start;

      &.RailwayRequestsListItem__content-items-right-top {
        margin-top: 15px;
      }

      &.RailwayRequestsListItem__content-items-right-top-big-screen {
        margin-top: 15px;
      }
    }
  }

  .RailwayRequestsListItem__number {
    margin-left: 0;
    margin-top: 15px;
  }
}
</style>
