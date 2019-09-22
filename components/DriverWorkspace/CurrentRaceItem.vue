<template>
<div style="padding-bottom: 25px;">

  <span class="title">{{ $t('forms.driverWorkspace.currentRace') }}</span>

  <ItemCard class="CurrentRaceItem__item-card">
    <div
      class="CurrentRaceItem"
      v-loading="loading"
    >
      <div class="CurrentRaceItem__col">

        <div class="CurrentRaceItem__row">
          <div class="CurrentRaceItem__row__status">
            <Status
              :title="$t(race.status.localeKey)"
              :color="race.status.color"
            />
          </div>

          <div class="CurrentRaceItem__row__date">
            <span class="CurrentRaceItem__row__date-value">{{ race.date }}</span>
          </div>
        </div>

        <div class="CurrentRaceItem__row route">
          <RouteVertical
            :point-from-name="race.pointFromName"
            :point-from-region="race.pointFromRegion"
            :point-to-name="race.pointToName"
            :point-to-region="race.pointToRegion"
            :distance="race.distance"
          />
        </div>

        <div class="CurrentRaceItem__row">
          <div
            class="CurrentRaceItem__row__good"
            v-if="race.goodName"
          >
            <span class="CurrentRaceItem__row__good-title">{{ $t('forms.common.goods') }}</span>
            <span class="CurrentRaceItem__row__good-value">{{ race.goodName }}</span>
          </div>
        </div>

        <div
          class="CurrentRaceItem__footer"
          v-if="!race.pqQueueRequestGuid"
        >
          <Button
            style="width: 100%"
            type="primary"
            round
            @click="handleClickCheckGeo"
          >{{ $t('forms.driverWorkspace.buttonQueueRequest') }}</Button>
        </div>

      </div>
    </div>

    <i class="CurrentRaceItem__close el-icon-delete" @click="handleClose" />
  </ItemCard>

</div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import RouteVertical from '@/components/Common/RouteVertical'

import * as notify from '@/utils/notifications'
import * as confirm from '@/utils/confirm'

export default {
  name: 'th-current-race-item',

  components: {
    Button,
    ItemCard,
    Status,
    RouteVertical
  },

  props: {
    race: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    loading: false,
    lat: null,
    lng: null
  }),

  computed: {
    actionsheetItems() {

      return [
        this.race.queueProfileFromGuid && {
          children: [{
            text: this.race.queueProfileFromAddress,
            function: this.handleClickQueueRequest
          }]
        },
        this.race.queueProfileToGuid && {
          children: [{
            text: this.race.queueProfileToAddress,
            function: this.handleClickQueueRequest
          }]
        }
      ].filter(Boolean)

    }
  },

  methods: {
    async handleClickCheckGeo() {
      this.loading = true

      if ('geolocation' in navigator)
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lng } }) => {

            this.loading = false

            this.lat = lat
            this.lng = lng

            this.$methods.driver.setActionsheet(true, this.actionsheetItems)

          }, () => {

            this.loading = false
            notify.error(this.$t('forms.driverWorkspace.queueRequestErrorGeo'))

          }
        )

    },

    async handleClickQueueRequest() {
      const direction = this.race.hasOwnProperty('queueProfileFromGuid') ? 'loading' : 'unloading'
      const queueProfileGuid = this.race.queueProfileFromGuid ? this.race.queueProfileFromGuid : this.race.queueProfileToGuid
      this.loading = true

      const status = await this.$api.parkingQueueRequest.createPQQueueRequest({
        raceGuid: this.race.guid,
        queueProfileGuid,
        direction,
        lat: this.lat,
        lng: this.lng
      })

      if (status) {
        this.$emit('update')
        notify.success(this.$t('forms.driverWorkspace.queueRequestSuccess'))
      }

      this.loading = false
    },

    handleClose() {
      confirm.warning('Are you sure you want to remove the race?').then(() => this.$emit('close'))
    }
  }
}
</script>

<style lang="scss" scoped>
.CurrentRaceItem {

    &__item-card {
      position: relative;
    }

    color: $--main-text-color;

    &__col {
        padding: {
            top: 5px;
            right: 5px;
            bottom: 0;
            left: 5px;
        };

        .CurrentRaceItem__row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            &.route {
                margin-top: 40px;
            }

            &__status {
                display: flex;
                flex-direction: row;

                &-value {
                    font-weight: bold;
                    margin-left: 8px;
                }
            }

            &__date-value {
                font-size: 25px;
                font-weight: bold;
            }

            &__good,
            &__number {
                display: flex;
                flex-direction: column;
                margin-top: 40px;
                margin-right: 70px;

                &-title {
                    font-size: 13px;
                    margin-bottom: 5px;
                    display: block;
                }

                &-value {
                    font-weight: bold;
                    color: $--main-text-color;
                }
            }
        }
    }

    &__footer {
      margin-top: 20px;

      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__close {
      position: absolute;
      top: 0px;
      right: 5px;

      height: 40px;
      width: 40px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1rem;
      color: $--color-info;

      border-radius: 50%;
      border: 1px solid $--color-info-light;
      background: $--color-white;

      cursor: pointer;
      transform: translate(0, -50%);
      transition: .2s;

      &:hover {
        color: $--color-danger;

        border-color: $--color-danger;

        transition: .2s;
      }
    }
}

.ItemCard__wrapper {
    padding: {
        top: 0;
        right: 25px;
        bottom: $--driver-workspace-padding;
        left: 25px;
    }
}

.title {
    padding-left: 25px;
    color: $--color-primary;
    font-weight: 500;
}

@media screen and (max-width: 360px) {
    .CurrentRaceItem {
        &__col {
            .CurrentRaceItem__row {
                &.route {
                    margin-top: 30px;
                }

                &__good {
                    margin-top: 30px;
                }
            }
        }
    }
}

@media screen and (max-width: 320px) {
    .title {
        font-size: 10px;
    }

    .CurrentRaceItem {
        &__col {
            .CurrentRaceItem__row {
                &__status {
                    &-value {
                        font-size: 12px;
                    }
                }

                &.route {
                    margin-top: 20px;
                }

                &__date-value {
                    font-size: 20px !important;
                }

                &__good {
                    margin-top: 20px;

                    &-title {
                        font-size: 12px;
                    }

                    &-value {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>
