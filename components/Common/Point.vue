<template>
  <div :class="{ 'Point': true, 'Point__toggled': showBody }">
    <span class="Point__title">
      <i class="fas fa-map-marker-alt" style="margin-right: 10px"></i>
      {{ label }}
    </span>

    <span v-if="!error" class="Point__title__description-link" @click="showBody = !showBody">
      {{ point.description }}
    </span>

    <span v-if="error">
      <span>
        {{ `${$t('forms.point.statusFailed')}` }}
      </span>
    </span>

    <div v-if="!error">
    <Collapse>
      <div class="Point__body" v-show="showBody">

        <el-row :gutter="20">
          <el-col :xd="24" :md="12">
            <div class="Point__body-item">
              <!-- <span class="Point__body-item__locality">{{ point.typeAndName }}</span> -->
              <span class="Point__body-item__locality-type">{{ point.type }}
                <span class="Point__body-item__locality-name">{{ point.name }}</span>
              </span>
              <span class="Point__body-item__district">{{ point.districtName }}</span>
              <span class="Point__body-item__region">{{ point.regionName }}</span>
              <span class="Point__body-item__country">{{ point.countryName }}</span>
            </div>
          </el-col>

          <el-col :xd="24" :md="12">
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

import { GoogleMaps } from '@/utils/maps'

export default {
  name: 'th-form-point',

  components: {
    Collapse
  },

  props: {
    koatuu: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      showBody: false,
      error: false,
      point: {}
    }
  },

   methods: {
    async _fetch() {
      const { status, item } = await this.$api.points.getPoint(this.koatuu)
      if (status) {
        this.point = item
        // this.point.typeAndName = `${this.point.type} ${this.point.name}`
      } else {
        this.error = true
      }
    },
    getMap() {
      return GoogleMaps.getEmbedMap(this.koatuu, this.koatuu)
    }
  },

  created() {
    this._fetch()
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
    color: #FECD34;

    &:hover {
      text-decoration: underline;
    }
  }

  .Point__title-icon {
      width: 13px;
      color: #FECD34;
      float: right;
  }

  .Point__body {
    margin: 10px 0;

    .Point__body-item {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      color:#7e7e7f;

      span{
        margin-bottom: 35px;
      }

      .Point__body-item__locality-type {
        font-size: 20px;
        color: #b7b7b7;
      }

      .Point__body-item__locality-name {
        font-size: 28px;
        font-weight: bold;
        color:#7e7e7f !important;
      }

      .Point__body-item__district {
        font-size: 23px;
      }

      .Point__body-item__region {
        font-size: 20px;
      }

       .Point__body-item__country {
        font-size: 16px;
      }
    }
  }
}

.Point__toggled {
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>
