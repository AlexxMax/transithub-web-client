<template>
  <div>
    <ItemCard>

      <div>
        <el-row>
          <el-col :xs="24" :md="16">
            <div class="RequestsListItem__row--horizontal">
              <div>
                <fa class="RequestsListItem__icon" icon="calendar-alt"/>
                <span class="RequestsListItem__date">{{ row.scheduleDate }}</span>
              </div>

              <div class="RequestsListItem__row--horizontal--last" v-if="row.organisationName">
                <fa class="RequestsListItem__icon" icon="truck"/>
                <span>{{ row.organisationName }}</span>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="8">
            <div
              :class="{
                'RequestsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall,
                'RequestsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
              }"
            >
              <span
                v-if="row.vehiclesRegisterStatus"
                class="RequestsListItem__vehicles-register-status"
                :style="{ color: row.vehiclesRegisterStatus.color }"
              >
                {{ $t(row.vehiclesRegisterStatus.localeKey) }}
              </span>

              <Status
                :title="$t(row.status.localeKey)"
                :color="row.status.color"
              />
            </div>
          </el-col>
        </el-row>

        <div class="RequestsListItem__row">
          <el-row>
            <el-col :xs="24" :md="18">
              <div class="RequestsListItem__row--horizontal">
                <Route
                  :point-from-name="row.pointFromName"
                  :point-from-koatuu="row.pointFromKoatuu"
                  :point-from-region="row.pointFromRegion"
                  :point-to-name="row.pointToName"
                  :point-to-koatuu="row.pointToKoatuu"
                  :point-to-region="row.pointToRegion"
                  :warehouse-from-lat="row.warehouseFromLat"
                  :warehouse-from-lng="row.warehouseFromLng"
                  :warehouse-to-lat="row.warehouseToLat"
                  :warehouse-to-lng="row.warehouseToLng"
                />

                <div class="RequestsListItem__row--horizontal--last">
                  <fa class="RequestsListItem__icon" icon="road"/>
                  <span>{{ `${row.distance} ${$t('forms.common.km')}` }}</span>
                </div>
              </div>
            </el-col>

            <el-col :xs="24" :md="6">
              <span
                :class="{
                  'RequestsListItem__left-item number': !$_smallDeviceMixin_isDeviceSmall,
                  'RequestsListItem__left-item-mobile number': $_smallDeviceMixin_isDeviceSmall
                }"
                style="margin-top:12px;"
              >
                {{ `№${row.number}` }}
              </span>
            </el-col>
          </el-row>
        </div>

        <div class="RequestsListItem__row">
          <el-row>
            <el-col :xs="24" :md="12">
              <div class="RequestsListItem__row--horizontal">
                <div>
                  <fa class="RequestsListItem__icon" icon="box"/>
                  <span>{{ row.goodsName }}</span>
                </div>

                <div class="RequestsListItem__row--horizontal--last">
                  <fa class="RequestsListItem__icon" icon="balance-scale"/>
                  <span v-if="row.quantityT">{{ `${row.quantityT} т` }}</span>
                  <span v-else>{{ '0 т' }}</span>
                </div>

                <div class="RequestsListItem__row--horizontal--last">
                  <fa class="RequestsListItem__icon" icon="wallet"/>
                  <span>{{ `${row.rate} ${$t('forms.common.grnT')}` }}</span>
                </div>
              </div>
            </el-col>

            <el-col :xs="24" :md="12">
              <div
                :class="{
                  'RequestsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall,
                  'RequestsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }"
              >
                <Company :name="row.clientName"/>
              </div>
            </el-col>

            <el-col :xs="24" :md="12">
              <div
                v-if="row.orderGuid"
                :class="{
                  'RequestsListItem__left-item': !$_smallDeviceMixin_isDeviceSmall,
                  'RequestsListItem__left-item-mobile': $_smallDeviceMixin_isDeviceSmall
                }"
                style="line-height: 40px">
                <nuxt-link :to="$i18n.path(`workspace/orders/${row.orderGuid}`)">{{ $t('forms.order.title') }}</nuxt-link>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div slot="footer-left" class="RequestsListItem__footer">
        <nuxt-link :to="$i18n.path(`workspace/requests/${row.guid}`)">
          <Button round type="primary">{{ $t('lists.open') }}</Button>
        </nuxt-link>

        <Button
          round
          type=""
          @click="$emit('open-vehicle-register-generation-form', row)"
        >
          {{ $t('forms.common.vehiclesRegisterOutfits') }}
        </Button>

        <Button
          round
          type=""
          @click="$emit('open-races-form', row)"
          style="margin-left: 0;"
        >
          {{ $t('lists.requestsRaces') }}
        </Button>

        <ButtonAddToBookmarks
          style="margin-left: 0"
          :currentlyInBookmarks="row.isFavorite"
          :handle-click="handleAddToBookmarksButton"
        />
      </div>

      <div slot="footer-right">

      </div>

      <div slot="footer-right-menu">
        <el-dropdown-item>
          <Button
            simple
            hover-underline
            fa-icon="book-open"
            @click="$emit('open-vehicle-register-generation-form', row)">
            {{ $t('forms.common.vehiclesRegisterOutfits') }}
          </Button>
        </el-dropdown-item>
      </div>

    </ItemCard>
  </div>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import Route from '@/components/Common/Route'
import Company from '@/components/Companies/Company'
import Button from '@/components/Common/Buttons/Button'
import ButtonAddToBookmarks from '@/components/Common/Buttons/ButtonAddToBookmarks'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-request-list-item',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    ItemCard,
    Status,
    Route,
    Company,
    Button,
    ButtonAddToBookmarks
  },

  props: {
    row: Object,
    open: {
      type: Function,
      default: null
    }
  },

  computed: {
    carrierCompany() {
      return this.$store.state.companies.currentCompany.name
    }
  },

  methods: {
    async handleAddToBookmarksButton() {
      const { guid, isFavorite } = this.row
      if (isFavorite) {
        await this.$store.dispatch('requests/REMOVE_ITEM_FROM_BOOKMARKS', guid)
      } else {
        await this.$store.dispatch('requests/ADD_ITEM_TO_BOOKMARKS', guid)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RequestsListItem__left-item {
  display: flex;
  justify-content: flex-end;
}

.RequestsListItem__left-item-mobile {
  display: flex;
  justify-content: flex-start;
  margin: {
    top: 15px;
    left: 0 !important;
  }
}

.RequestsListItem__row {
  margin-top: 15px;

  &--horizontal {
    display: flex;
    flex-direction: row;

    &--last {
      margin-left: 30px;
      display: flex;
      align-items: center;
    }
  }
}

.number {
  color: #FFD74D;
  margin-left: 20px;
  font-weight: 500;
}

.RequestsListItem {
  &__icon {
    margin-right: 10px;
    width: 15px;
  }

  &__date {
    font-weight: 500;
  }
}

.RequestListItem__races-list-title {
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

.RequestsListItem__vehicles-register-status {
  margin-right: 30px;
}

.RequestsListItem__footer {
  margin-top: -20px;
}

@media (max-width: 600px) {
  .RequestsListItem__row {
    &--horizontal {
      flex-direction: column;

      &--last {
        margin: {
          top: 25px;
          left: 0;
        }
      }
    }
  }

  .RequestsListItem__footer {
    margin-top: 0;
  }

  .number {
    display: none;
  }
}
</style>
