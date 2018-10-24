<template>
  <div v-if="code" :class="{ 'Warehouse': true, 'Warehouse__toggled': showBody }">
    <span class="Warehouse__title">
      <i class="fas fa-map-marker-alt" style="margin-right: 10px"></i>
      {{ label }}
    </span>

    <span v-if="!error" class="Warehouse__title__full-address-link" @click="showBody = !showBody">
      {{ warehouse.fullAddress }}
    </span>

    <span v-if="error">
      <span>
        {{ `${$t('forms.common.warehouseStatusFailed')}` }}
      </span>
    </span>

    <div v-if="!error">
    <Collapse>
      <div class="Warehouse__body" v-show="showBody">

        <el-row :gutter="20">
          <el-col :xd="24" :md="12">
            <div class="Warehouse__body-item">
              <span class="Warehouse__body-kind">{{ warehouse.kind }}
                <span class="Warehouse__body-name">{{ warehouse.name }}</span>
              </span>
              <span class="Warehouse__body-item__street-type">{{ warehouse.streetType }}
                <span class="Warehouse__body-item__street-name">{{ warehouse.streetName }}, {{ warehouse.buildingNr}}</span>
              </span>
              <span class="Warehouse__body-item__locality-type">{{ warehouse.locationType }}
                <span class="Warehouse__body-item__locality-name">{{ warehouse.locationName }}</span>
              </span>
              <span class="Warehouse__body-item__district">{{ warehouse.districtName }}</span>
              <span class="Warehouse__body-item__region">{{ warehouse.regionName }}</span>
              <span class="Warehouse__body-item__country">{{ warehouse.countryName }}</span>
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
  name: 'th-form-warehouse',

  components: {
    Collapse
  },

  props: {
    code: {
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
      warehouse: {}
    }
  },

   methods: {
    async _fetch() {
      const { status, item } = await this.$api.warehouses.getWarehouse(this.code)
      if (status) {
        this.warehouse = item
      } else {
        this.error = true
      }
    },
    getMap() {
      return GoogleMaps.getEmbedMap(this.code, this.code)
    }
  },

  created() {
    this._fetch()
  }
}
</script>

<style lang="scss" scoped>
.Warehouse {
  margin: -10px -10px 30px;
  padding: 10px 10px 0;

   display: flex;
   flex-direction: column;

  .Warehouse__title {
    color: #606266;
    margin-bottom: 15px;
  }

  .Warehouse__title__full-address-link {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: #FECD34;

    &:hover {
      text-decoration: underline;
    }
  }

  .Warehouse__title-icon {
      width: 13px;
      color: #FECD34;
      float: right;
  }

  .Warehouse__body {
    margin: 10px 0;

    .Warehouse__body-item {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      color: #7e7e7f;

      span{
        margin-bottom: 25px;
      }

      .Warehouse__body-kind, .Warehouse__body-item__street-type, .Warehouse__body-item__locality-type {
        color: #b7b7b7;
      }

      .Warehouse__body-name, .Warehouse__body-item__street-name, .Warehouse__body-item__locality-name {
        color:#7e7e7f;
      }

      .Warehouse__body-kind {
        font-size: 20px;
      }

      .Warehouse__body-name {
        font-size: 28px;
        font-weight: bold;
      }

      .Warehouse__body-item__street-type {
        font-size: 17px;
      }

      .Warehouse__body-item__street-name {
        font-size: 23px;
      }

      .Warehouse__body-item__locality-type {
        font-size: 14px;
      }

      .Warehouse__body-item__locality-name {
        font-size: 20px;
      }

      .Warehouse__body-item__district {
        font-size: 17px;
      }

      .Warehouse__body-item__region {
        font-size: 14px;
      }

      .Warehouse__body-item__country {
        font-size: 12px;
      }
    }
  }
}

.Warehouse__toggled {
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>
