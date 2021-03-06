<template>
  <div class="Route">

    <div class="Route__title" @click="dialogVisible = true">
      <span
        class="Route__title-icon"
        :style="{ 'margin-top': hasRegions ? '12px' : '4px' }">
        <fa icon="route"/>
      </span>

      <div class="Route__title-item">
        <span class="Route__title-item-name">{{ pointFromName }}</span>
        <span class="Route__title-item-region">{{ pointFromRegion }}</span>
      </div>

      <div class="Route__title-arrow">{{ '\u2192' }}</div>

      <div class="Route__title-item">
        <span class="Route__title-item-name">{{ pointToName }}</span>
        <span class="Route__title-item-region">{{ pointToRegion }}</span>
      </div>
    </div>

    <el-dialog
      :title="$t('forms.common.route')"
      :visible.sync="dialogVisible"
      :fullscreen="$_smallDeviceMixin_isDeviceSmall"
      :append-to-body="appendToBody"
      :z-index="zIndex"
    >

      <div class="Route__form" v-loading="loading">
        <el-row :gutter="20">
          <el-col :xd="24" :md="12">
            <span class="Route__form-label">
              {{ $t('forms.common.pointFrom') }}
            </span>
            <PointPresentation :point="pointFrom"/>
          </el-col>

          <el-col :xd="24" :md="12">
            <span
              class="Route__form-label"
              :style="{ 'margin-top': $_smallDeviceMixin_isDeviceSmall ? '15px' : '0' }">
              {{ $t('forms.common.pointTo') }}
            </span>
            <PointPresentation :point="pointTo"/>
          </el-col>
        </el-row>
      </div>

      <Map
        koatuu
        :origin="{ lat: +warehouseFromLat ,lng: +warehouseFromLng }"
        :destination="{ lat: +warehouseToLat ,lng: +warehouseToLng }"
      />
    </el-dialog>

  </div>
</template>

<script>
import PointPresentation from '@/components/Common/PointPresentation'
import Map from '@/components/Common/Map'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import * as notify from '@/utils/notifications'

export default {
  name: 'th-route',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    PointPresentation,
    Map
  },

  props: {
    pointFromKoatuu: {
      type: String,
      required: true
    },
    pointFromName: {
      type: String,
      required: true
    },
    pointFromRegion: String,
    pointToKoatuu: {
      type: String,
      required: true
    },
    pointToName: {
      type: String,
      required: true
    },
    pointToRegion: String,
    appendToBody: Boolean,
    zIndex: {
      type: Number,
      default: 3000
    },
    warehouseFromLat: [ Number, String ],
    warehouseFromLng: [ Number, String ],
    warehouseToLat: [ Number, String ],
    warehouseToLng: [ Number, String ]
  },

  data() {
    return {
      pointFrom: {},
      pointTo: {},

      dialogVisible: false,
      loading: false,
      fetched: false
    }
  },

  computed: {
    hasRegions() {
      return !!this.pointFromRegion && !!this.pointToRegion
    }
  },

  methods: {
    async fetch() {
      this.loading = true

      try {
        const [ pointFrom, pointTo ] = await Promise.all([
          this.$api.points.getPoint(this.pointFromKoatuu),
          this.$api.points.getPoint(this.pointToKoatuu)
        ])

        if (pointFrom.status) {
          this.pointFrom = pointFrom.item
        }

        if (pointTo.status) {
          this.pointTo = pointTo.item
        }
      } catch (error) {
        this.dialogVisible = false
        notify.error(error.message)
      }

      this.loading = false
      this.fetched = true
    }
  },

  watch: {
    dialogVisible() {
      if (this.dialogVisible && !this.fetched) {
        this.fetch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Route {
  width: fit-content;

  .Route__title {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    border-radius: 5px;
    margin: -5px;
    padding: 5px;

    &:hover {
      background-color: #f8f8f8;
    }

    .Route__title-icon {
      margin-right: 10px;
      width: 15px;
    }

    .Route__title-item {
      display: flex;
      flex-direction: column;

      .Route__title-item-name {
        font-size: 14px;
        font-weight: 400;
        color: #000;
      }

      .Route__title-item-region {
        margin-top: 5px;
        font-size: 13px;
        color: rgb(112, 112, 112);
      }
    }

    .Route__title-arrow {
      padding: 0 10px;
    }
  }

  .Route__form {
    .Route__form-label {
      color: #606266;
    }
  }
}
</style>
