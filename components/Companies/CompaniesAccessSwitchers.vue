<template>
  <div class="CompanyAccessSwitchers">
    <span class="CompanyAccessSwitchers__title">{{ $t('forms.common.sectionsAccess') }}</span>

    <el-switch
      v-model="autoChecked"
      :active-text="$t('forms.common.sectionAuto')"
      @change="handleAccessChange"
      style="margin-bottom: 10px;"
    />

    <el-switch
      v-model="railwayChecked"
      :active-text="$t('forms.common.sectionRailway')"
      @change="handleAccessChange"
      style="margin-bottom: 10px;"
    />
    
    <el-switch
      v-model="queueChecked"
      :active-text="$t('forms.common.sectionQueue')"
      @change="handleAccessChange"
    />
  </div>
</template>

<script>
export default {
  name: 'th-companies-access-switchers',

  props: {
    accessAuto: Boolean,
    accessRailway: Boolean,
    accessQueue: Boolean,
  },

  data() {
    return {
      autoChecked: this.accessAuto,
      railwayChecked: this.accessRailway,
      queueChecked: this.accessQueue,
    }
  },

  methods: {
    handleAccessChange() {
      if (!this.accessAuto && !this.accessRailway && !this.accessQueue) {
        this.accessAuto = true
      }
      this.$emit('changed', {
        accessAuto: this.autoChecked,
        accessRailway: this.railwayChecked,
        accessQueue: this.queueChecked,
      })
    }
  },

  watch: {
    accessAuto: {
      immediate: true,
      handler(value) {
        this.autoChecked = value
      }
    },
    accessRailway: {
      immediate: true,
      handler(value) {
        this.railwayChecked = value
      }
    },
    accessQueue: {
      immediate: true,
      handler(value) {
        this.queueChecked = value
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.CompanyAccessSwitchers {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 10px;
    color: #606266;
  }
}
</style>
