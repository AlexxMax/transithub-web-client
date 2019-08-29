<template>
  <div class="RaceFormTop">
    <div class="RaceFormTop__header">
      <div class="RaceFormTop__header__title">
        <span class="RaceFormTop__header__title__main-title">{{ title }}</span>
        <span class="RaceFormTop__header__title__subtitle">{{ subtitle }}</span>
      </div>

      <div class="RaceFormTop__header__close">
        <i class="el-icon-close" @click="$emit('close')"/>
      </div>
    </div>

    <div class="RaceFormTop__progress">
      <el-progress :percentage="percentage" :color="progressColor" :show-text="false"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-driver-workspace-race-form-top',

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
  },

  created() {
    this.progressColor = '#FFD74D';
  }
}
</script>

<style lang='scss' scoped>
.RaceFormTop {
  position: sticky;
  top: 56px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  padding: {
    top: 15px;
    bottom: 15px;
  };
  border-bottom: $--driver-workspace-border;
  background-color: $--color-white;

  &__header {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    &__close {
      flex: 1;
      text-align: right;
      font-size: 30px;
      margin-right: 5px;
    }

    &::before {
      content: '';
      flex: 1;
    }

    &__title {
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 9;

      &__main-title {
        font-size: 16px;
        font-weight: bold;
      }

      &__subtitle {
        font-size: 12px;
        font-weight: 600;
      }
    }
  }

  &__progress {
    margin: 0 10px;
  }
}
</style>
