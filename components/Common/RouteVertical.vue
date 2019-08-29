<template>
  <div class="RouteVertical">

    <div class="RouteVertical__title" @click="handleShowDialog">
      <div class="RouteVertical__title-item">
        <span class="RouteVertical__title-item-name">{{ pointFromName }}</span>
        <span class="RouteVertical__title-item-region">{{ pointFromRegion }}</span>
      </div>

      <div class="RouteVertical__title__distance">

        <div class="RouteVertical__title__distance-icon">
          <div class="circle"></div>
          <div id="rectangle"></div>
          <div class="circle"></div>
        </div>

        <div class="RouteVertical__title__distance-value" v-if="distance">
          <span>{{ `${distance} ${$t('forms.common.km')}` }}</span>
        </div>
      </div>

      <div class="RouteVertical__title-item">
        <span class="RouteVertical__title-item-name">{{ pointToName }}</span>
        <span class="RouteVertical__title-item-region">{{ pointToRegion }}</span>
      </div>
    </div>

    <el-dialog
      v-if="showDialogOnClick"
      :title="$t('forms.common.route')"
      :visible.sync="dialogVisible"
      :fullscreen="$_smallDeviceMixin_isDeviceSmall"
      :append-to-body="appendToBody"
      :z-index="zIndex"
    >

      <div class="RouteVertical__form" v-loading="loading">
        <el-row :gutter="20">
          <el-col :xd="24" :md="12">
            <span class="RouteVertical__form-label">
              {{ $t('forms.common.pointFrom') }}
            </span>
            <PointPresentation :point="pointFrom"/>
          </el-col>

          <el-col :xd="24" :md="12">
            <span
              class="RouteVertical__form-label"
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
  name: 'th-RouteVertical',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    PointPresentation,
    Map
  },

  props: {
    pointFromKoatuu: {
      type: String,
      //required: true
    },
    pointFromName: {
      type: String,
      required: true
    },
    pointFromRegion: String,
    pointToKoatuu: {
      type: String,
      //required: true
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
    warehouseToLng: [ Number, String ],
    distance: {
      type: Number,
      required: true
    },
    showDialogOnClick: {
      type: Boolean,
      default: true,
    }
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
    },

    handleShowDialog() {
      if (this.showDialogOnClick) {
        this.dialogVisible = true
      }
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
.RouteVertical {
  width: fit-content;

  &__title {
    display: flex;
    flex-direction: column;
    //cursor: pointer;
    border-radius: 5px;
    margin: -5px;
    padding: 5px;
    color: $--main-text-color;

    // &:hover {
    //   background-color: #f8f8f8;
    // }

    &__distance {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 15px;

      &-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: end;

        .circle {
          width: 3px;
          height: 3px;
          background: #D8D8D8;
          border-radius: 50%;
        }

        #rectangle {
          width: 1px;
          height: 15px;
          background: #D8D8D8;
          margin: 4px 0;
        }
      }

      &-value {
        margin-left: 20px;
        color: #606266;
        font-weight: bold;
        font-size: 18px;
      }
    }

    &-item {
      display: flex;
      flex-direction: column;
      word-break: break-word;

      &:last-child {
        margin-top: 15px;
      }

      &-name {
        font-size: 18px;
        font-weight: bold;
      }

      &-region {
        margin-top: 5px;
        font-size: 13px;
      }
    }
  }
}

@media screen and (max-width: 320px) {
  .RouteVertical {
    &__title {
      &__distance {
        margin-top: 10px;

        &-value {
          font-size: 16px;
        }
      }

      &-item {
        &:last-child {
          margin-top: 10px;
        }

        &-name {
          font-size: 16px;
        }

        &-region {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
