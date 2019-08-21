<template>
  <div style="margin-top: 25px;" v-show="visible">
    <div class="title">
      <span id="title">{{ $t('forms.driverWorkspace.currentRace') }}</span>
      <span id="number">{{ `№${race.number}` }}</span>
    </div>
   
    <ItemCard>
      <div class="CurrentRaceItem">
        <div class="CurrentRaceItem__col">

          <div class="CurrentRaceItem__row">
            <div class="CurrentRaceItem__row__status">
              <Status 
                :color="'green'"
                :point-style="{ 'margin-right': 0, 'margin-top': '2px' }"
              />

              <span class="CurrentRaceItem__row__status-value">{{ race.status }}</span>
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
            <div class="CurrentRaceItem__row__good" v-if="race.goodName">
              <span class="CurrentRaceItem__row__good-title">{{ $t('forms.common.goods') }}</span>
              <span class="CurrentRaceItem__row__good-value">{{ race.goodName }}</span>
            </div>
          </div>

        </div>
      </div>
    </ItemCard>
  </div>
</template>

<script>
import ItemCard from '@/components/Common/Lists/ItemCard'
import Status from '@/components/Common/FormElements/Constituents/Status'
import RouteVertical from '@/components/Common/RouteVertical'

export default {
  name: 'th-current-race-item',

  components: {
    ItemCard,
    Status,
    RouteVertical
  },

  props: {
    race: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.CurrentRaceItem {
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
      
      &__good, &__number {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        margin-right: 70px;

        &-title {
          font-size: 12px;
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
}

.ItemCard__wrapper {
  padding: {
    top: 0;
    right: 25px;
    bottom: 15px;
    left: 25px;
  }
}

.title {
  padding-left: 25px;
  font-size: 12px;
  color: $--color-primary;

  #title {
    font-weight: 500;
  }

  #number {
    font-weight: bold;
  }
}

// .el-card {
//   box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.07);
//   border: none !important;
// }

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
            font-size: 10px;
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