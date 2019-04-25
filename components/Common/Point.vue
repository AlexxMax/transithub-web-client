<template>
  <div
    v-if="koatuu"
    :class="{ 'Point': true, 'Point__toggled': showBody }"
    v-loading="loading">
    <span class="Point__title">
      <i class="fas fa-map-marker-alt" style="margin-right: 10px"></i>
      {{ label }}
    </span>

    <span v-if="!error" class="Point__title__description-link" @click="showBody = !showBody">
      {{ name || point.description }}
    </span>

    <span v-if="error">
      <span>
        {{ `${$t('forms.common.pointStatusFailed')}` }}
      </span>
    </span>

    <div v-if="!error">
    <Collapse>
      <div class="Point__body" v-show="showBody">

        <el-row :gutter="20">
          <el-col :xd="24" :md="noMap ? 24 : 12">
            <PointPresentation :point="point"/>
          </el-col>

          <el-col :xd="24" :md="12" v-if="!noMap">
            <iframe width="100%" height="320" frameborder="0" style="border:0" :src="getMap()" allowfullscreen></iframe>
          </el-col>
        </el-row>

      </div>
    </Collapse>
    </div>
  </div>
</template>

<script>
import Collapse from '@/components/Common/Transitions/Collapse'
import PointPresentation from '@/components/Common/PointPresentation'

import { GoogleMaps } from '@/utils/maps'

export default {
  name: 'th-form-point',

  components: {
    Collapse,
    PointPresentation
  },

  props: {
    koatuu: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    name: String,
    noMap: Boolean
  },

  data() {
    return {
      showBody: false,
      error: false,
      point: {},
      loading: false,
      fethed: false
    }
  },

   methods: {
    async _fetch() {
      this.loading = true
      const { status, item } = await this.$api.points.getPoint(this.koatuu)
      if (status) {
        this.point = item
        // this.point.typeAndName = `${this.point.type} ${this.point.name}`
      } else {
        this.error = true
      }
      this.loading = false
    },
    getMap() {
      return GoogleMaps.getEmbedMap(this.koatuu, this.koatuu)
    }
  },

  watch: {
    showBody() {
      if (!this.fethed) {
        this._fetch()
        this.fethed = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Point {
  margin: -10px -10px 30px;
  padding: 10px 10px 0;

   display: flex;
   flex-direction: column;

  .Point__title {
    color: #606266;
    margin-bottom: 15px;
  }

  .Point__title__description-link {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: #FFD74D;

    &:hover {
      text-decoration: underline;
    }
  }

  .Point__title-icon {
      width: 13px;
      color: #FFD74D;
      float: right;
  }

  .Point__body {
    margin: 10px 0;
  }
}

.Point__toggled {
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>
