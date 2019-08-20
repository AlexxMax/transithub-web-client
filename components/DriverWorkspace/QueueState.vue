<template>
  <div class="QueueState__card-wrapper">
    <div class="QueueState__card-wrapper__content">

      <div class="QueueState__card-wrapper__content__number">

        <div class="QueueState__card-wrapper__content__number__value">{{ number }}</div>
        <span class="QueueState__card-wrapper__content__number__subtitle">
          {{ $t('forms.driverWorkspace.numberInQueue') }}
        </span>
      </div>

      <div class="QueueState__card-wrapper__content__waiting-time">

        <div class="QueueState__card-wrapper__content__waiting-time__value">
          {{ waitingTimeHours }}<span v-if="waitingTimeHours && waitingTimeHours !=='-'">{{ $t('forms.driverWorkspace.hours') }}</span>
          {{ waitingTimeMinutes }}<span v-if="waitingTimeMinutes && waitingTimeMinutes !=='-'">{{ $t('forms.driverWorkspace.minutes') }}</span>
        </div>

        <span class="QueueState__card-wrapper__content__number__subtitle">{{ $t('forms.driverWorkspace.waitingTime') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "th-queue-state",

  props: {
    number: {
      type: [Number, String],
      default: '-'
    },
    waitingTimeHours: {
      type: [Number, String],
      default: '-'
    },
    waitingTimeMinutes: {
      type: [Number, String],
      default: '-'
    }
  }
}
</script>

<style lang="scss" scoped>
.QueueState__card-wrapper {
  background-color: #fff;
  height: 135px;
  border-radius: 0px 0px 5px 5px;
  border-top: 0;
  margin-bottom: 20px;
  box-shadow: 0px -1px 9px rgba(0, 0, 0, 0.07);

  &__content {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    padding: 30px 20px;

    &__number, &__waiting-time {
      display: flex;
      flex-direction: column;

      &__value {
        color: $--color-primary;
        font-size: 45px;
        font-weight: 500;
      }

      &__subtitle {
        font-size: 7px;
        text-transform: uppercase;
      }
    }

    &__waiting-time {
      &__value {
        span {
          font-size: 25px;
        }
      }
    }
  }
}
</style>