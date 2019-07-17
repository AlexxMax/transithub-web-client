<template>
  <div v-if="code" :class="{ 'Warehouse': true, 'Warehouse__toggled': showBody }">
    <span class="Warehouse__title">
      <fa icon="map-marker-alt" class="Warehouse__title__icon"/>
      {{ label }}
    </span>

    <span v-if="!error && isInRequest" class="Warehouse__title__full-address-link" @click="showBody = !showBody">
      {{ warehouse.kind }} {{ warehouse.name }}, {{ warehouse.streetType}} {{ warehouse.streetName}} {{ warehouse.buildingNr}}
    </span>

    <span v-else-if="!error" class="Warehouse__title__full-address-link" @click="showBody = !showBody">
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
          <el-col :xs="24" :md="14">
            <div class="Warehouse__body-item">
              <span class="Warehouse__body-kind">{{ warehouse.kind }}
                <span class="Warehouse__body-name value-bolder">{{ warehouse.name }}</span>
              </span>
              <span class="Warehouse__body-item__street-type">{{ warehouse.streetType }}
                <span class="Warehouse__body-item__street-name value-bolder">{{ warehouse.streetName }}, {{ warehouse.buildingNr}}</span>
              </span>
              <span class="Warehouse__body-item__locality-type">{{ warehouse.locationType }}
                <span class="Warehouse__body-item__locality-name value-bolder">{{ warehouse.locationName }}</span>
              </span>
              <span class="Warehouse__body-item__district value-bolder">{{ warehouse.districtName }}</span>
              <span class="Warehouse__body-item__region value-bolder">{{ warehouse.regionName }}</span>
              <span class="Warehouse__body-item__country value-bolder">{{ warehouse.countryName }}</span>
            </div>
          </el-col>

          <el-col :xs="24" :md="10">
            <div v-if="isInRequest" class="Warehouse__body-item">
              <span>
                {{ `${$t('forms.common.workPeriod')}` }}:
                <span class="Warehouse__body-item__schedule value-bolder">{{ scheduleFrom }} - {{ scheduleTo }}</span>
              </span>

              <!--  values (below) are set to null in warehouses.api -->
              <span>
                {{ `${$t('forms.common.warehouseTypeTrain')}` }}:
                <span class="Warehouse__body-item__type value-bolder">{{ typeTrain }}</span>
              </span>
              <span>
                {{ `${$t('forms.common.warehouseHeightTrain')}` }}:
                <span class="Warehouse__body-item__height value-bolder">{{ heightTrain }}</span>
              </span>
              <span>
                {{ `${$t('forms.common.warehouseLoadCapacity')}` }}:
                <span class="Warehouse__body-item__capacity value-bolder">{{ loadCapacity }}</span>
              </span>
              <span>
                {{ `${$t('forms.common.warehouseTypeScale')}` }}:
                <span class="Warehouse__body-item__scale value-bolder">{{ typeScale }}</span>
              </span>
              <span>
                {{ `${$t('forms.common.warehouseLenght')}` }}:
                <span class="Warehouse__body-item__lenght value-bolder">{{ lengthPlatform }}</span>
              </span>
            </div>
           </el-col>

          <el-col :xs="24" :md="24">
            <Map
              koatuu
              :lat="lat"
              :lng="lng"
            />
          </el-col>
        </el-row>
      </div>
    </Collapse>
    </div>
  </div>
</template>

<script>
import Collapse from '@/components/Common/Transitions/Collapse'
import Map from '@/components/Common/Map'

export default {
  name: 'th-form-warehouse',

  components: {
    Collapse,
    Map
  },

  props: {
    code: String,
    label: {
      type: String,
      required: true
    },
    isInRequest : {
      type: Boolean,
      required: true
    },
    scheduleFrom: {
      type: String,
      required: true
    },
    scheduleTo: {
      type: String,
      required: true
    },
    lat: [ String, Number ],
    lng: [ String, Number ],
    typeTrain: String,
    heightTrain: Number,
    loadCapacity: Number,
    typeScale: String,
    lengthPlatform: Number
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
      if (!this.code) return

      const { status, item } = await this.$api.warehouses.getWarehouse(this.code)
      if (status) {
        this.warehouse = item
      } else {
        this.error = true
      }
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
  padding: 20px 30px 0;

   display: flex;
   flex-direction: column;

  .Warehouse__title {
    color: #606266;
    margin-bottom: 15px;

    &__icon {
      font-size: 12px;
      color: #303133;
      margin: {
        bottom: 2px;
        right: 5px;
      }
    }
  }

  .Warehouse__title__full-address-link {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: #FFD74D;

    &:hover {
      text-decoration: underline;
    }
  }

  .Warehouse__title-icon {
      width: 13px;
      color: #FFD74D;
      float: right;
  }

  .Warehouse__body {
    margin: 10px 0;

    .Warehouse__body-item {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      font-size: 14px;
      //color: #7e7e7f;
      color: #606266;

      span {
        margin-bottom: 25px;
      }

      .value-bolder {
        font-weight: 600;
      }

      .Warehouse__body-kind, .Warehouse__body-item__street-type, .Warehouse__body-item__locality-type {
        //color: #b7b7b7;
      }

      .Warehouse__body-name, .Warehouse__body-item__street-name, .Warehouse__body-item__locality-name {
        //color:#7e7e7f;
      }

      .Warehouse__body-kind {
        //font-size: 20px;
      }

      .Warehouse__body-name {
        //font-size: 28px;
        //font-weight: bold;
      }

      .Warehouse__body-item__street-type {
        //font-size: 17px;
      }

      .Warehouse__body-item__street-name {
        //font-size: 23px;
      }

      .Warehouse__body-item__locality-type {
        //font-size: 14px;
      }

      .Warehouse__body-item__locality-name {
        //font-size: 20px;
      }

      .Warehouse__body-item__district {
        //font-size: 17px;
      }

      .Warehouse__body-item__region {
        //font-size: 14px;
      }

      .Warehouse__body-item__country {
        //font-size: 12px;
      }
    }
  }
}

.Warehouse__toggled {
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>
