<template>
  <div>
    <el-dropdown
      trigger="click"
      class="CreateNewMenu"
      @visible-change="handleDropdownVisibleChange"
      v-if="!userWithoutAcces"
    >
      <Tooltip :content="$t('forms.common.create')" placement="left">
        <span class="CreateNewMenu__icon">
          <fa icon="plus" style="font-size: 15px"/>
        </span>
      </Tooltip>

      <el-dropdown-menu slot="dropdown" style="overflow-x: hidden;">

        <!-- Auto Elements -->
        <div v-if="userAccessAuto">
          <NavmenuGroupTitle :title="$t('links.navmenu.auto')"/>

          <el-dropdown-item class="CreateNewMenu__item">
            <div class="CreateNewMenu__item-link">
              <span
                class="CreateNewMenu__item-link-content"
                @click="handleCreateNewDriver"
              >{{ $t("forms.common.driver") }}</span>
            </div>
          </el-dropdown-item>

          <el-dropdown-item class="CreateNewMenu__item">
            <div class="CreateNewMenu__item-link">
              <span
                class="CreateNewMenu__item-link-content"
                @click="handleCreateNewVehicle"
              >{{ $t("forms.common.vehicle") }}</span>
            </div>
          </el-dropdown-item>
        </div>


        <!-- Railway Elements -->
        <div v-if="userAccessRailway">
          <NavmenuGroupTitle
            :title="$t('links.navmenu.railway')"
            :class="{ 'overrided-margin': !userAccessAuto }"
            add-margin-top
          />

          <el-dropdown-item class="CreateNewMenu__item">
            <div class="CreateNewMenu__item-link">
              <span
                class="CreateNewMenu__item-link-content"
                @click="handleCreateNewRailwayAggregation"
              >{{ $t("forms.railwayAggregator.title") }}</span>
            </div>
          </el-dropdown-item>
        </div>

        <!-- Queues Elements -->
        <div v-if="userAccessQueue">
          <NavmenuGroupTitle
            :title="$t('links.navmenu.queues')"
            :class="{ 'overrided-margin': !userAccessRailway }"
            add-margin-top
          />

          <!-- PQQueueProfile -->
          <el-dropdown-item class="CreateNewMenu__item">
            <div class="CreateNewMenu__item-link">
              <span
                class="CreateNewMenu__item-link-content"
                @click="handleCreatePQQueueProfile"
              >{{ $t("forms.common.pqQueueProfile") }}</span>
            </div>
          </el-dropdown-item>

          <!-- PQWarehouse -->
          <el-dropdown-item class="CreateNewMenu__item">
            <div class="CreateNewMenu__item-link">
              <span
                class="CreateNewMenu__item-link-content"
                @click="handleCreatePQWarehouse"
              >{{ $t("forms.common.pqWarehouse") }}</span>
            </div>
          </el-dropdown-item>

          <!-- Parking -->
          <el-dropdown-item class="CreateNewMenu__item">
            <div class="CreateNewMenu__item-link">
              <span
                class="CreateNewMenu__item-link-content"
                @click="handleCreateNewPQParking"
              >{{ $t("forms.common.pqParking") }}</span>
            </div>
          </el-dropdown-item>

          <!-- Queue -->
          <el-dropdown-item class="CreateNewMenu__item">
            <div class="CreateNewMenu__item-link">
              <span
                class="CreateNewMenu__item-link-content"
                @click="handleCreateQueue"
              >{{ $t("forms.queue.queue") }}</span>
            </div>
          </el-dropdown-item>
        </div>

      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Tooltip from "@/components/Common/Tooltip";
import NavmenuGroupTitle from "@/components/Navmenu/NavmenuGroupTitle";

import {
  STORE_MODULE_NAME as VEHICLES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_ACTIONS_KEYS,
  EDIT_DIALOG_TYPES as VEHICLES_EDIT_DIALOG_TYPES
} from "@/utils/vehicles";

import {
  STORE_MODULE_NAME as DRIVERS_STORE_MODULE_NAME,
  ACTIONS_KEYS as DRIVERS_ACTIONS_KEYS,
  EDIT_DIALOG_TYPES as DRIVERS_EDIT_DIALOG_TYPES
} from "@/utils/drivers";

import {
  STORE_MODULE_NAME as PQ_QUEUE_PROFILES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_QUEUE_PROFILES_MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_QUEUE_PROFILES_EDIT_DIALOG_TYPES
} from '@/utils/pq.queueProfiles'

import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_WAREHOUSES_EDIT_DIALOG_TYPES
} from '@/utils/pq.warehouses'

import {
  STORE_MODULE_NAME as PQ_QUEUES_MODULE_NAME,
  ACTIONS_KEYS as PQ_QUEUES_ACTIONS_KEYS,
  MUTATIONS_KEYS as PQ_QUEUES_MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_EDIT_DIALOG_TYPES
} from '@/utils/pq.queues';

import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_PARKINGS_EDIT_DIALOG_TYPES
} from "@/utils/pq.parkings";

export default {
  name: "th-button-plus",
  components: {
    Tooltip,
    NavmenuGroupTitle
  },

  data: () => ({ dropdownVisible: false }),

  computed: {
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid;
    },

    userAccessAuto() {
      return this.$store.state.companies.userAccess.accessAuto
    },

    userAccessRailway() {
      return this.$store.state.companies.userAccess.accessRailway
    },

    userAccessQueue() {
      return this.$store.state.companies.userAccess.accessQueue
    },

    userWithoutAcces() {
      return !this.userAccessAuto && !this.userAccessRailway && !this.userAccessQueue
    }
  },

  methods: {
    handleDropdownVisibleChange(value) {
      this.dropdownVisible = value;
    },

    // BUTTON PLUS WITHOUT CHECKING IF USER HAS COMPANY

    // handleCreateNewVehicle() {
    //   this.$store.dispatch(
    //     `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.SHOW_EDIT_DIALOG}`,
    //     {
    //       show: true,
    //       type: VEHICLES_EDIT_DIALOG_TYPES.CREATE
    //     }
    //   );
    // },

    // handleCreateNewDriver() {
    //   this.$store.dispatch(
    //     `${DRIVERS_STORE_MODULE_NAME}/${DRIVERS_ACTIONS_KEYS.SHOW_EDIT_DIALOG}`,
    //     {
    //       show: true,
    //       type: DRIVERS_EDIT_DIALOG_TYPES.CREATE
    //     }
    //   );
    // },

    handleCreateNewRailwayAggregation() {
      if (this.userHasCompany) {
        this.$store.commit("railwayAggregations/SET_CREATE_NEW_DIALOG", true);
      } else {
        this.$store.commit(
          "railwayAggregations/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
          true
        );
      }
    },
    handleCreateNewDriver() {
      if (this.userHasCompany) {
        this.$store.dispatch(
          `${DRIVERS_STORE_MODULE_NAME}/${
            DRIVERS_ACTIONS_KEYS.SHOW_EDIT_DIALOG
          }`,
          {
            show: true,
            type: DRIVERS_EDIT_DIALOG_TYPES.CREATE
          }
        );
      } else {
        this.$store.commit(
          "drivers/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
          true
        );
      }
    },
    handleCreateNewVehicle() {
      if (this.userHasCompany) {
        this.$store.dispatch(
          `${VEHICLES_STORE_MODULE_NAME}/${
            VEHICLES_ACTIONS_KEYS.SHOW_EDIT_DIALOG
          }`,
          {
            show: true,
            type: VEHICLES_EDIT_DIALOG_TYPES.CREATE
          }
        );
      } else {
        this.$store.commit(
          "vehicles/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
          true
        );
      }
    },

    handleCreatePQQueueProfile() {
      if (this.userHasCompany) {
        this.$store.dispatch(`${PQ_QUEUE_PROFILES_STORE_MODULE_NAME}/${PQ_QUEUE_PROFILES_MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, {
          show: true,
          type: PQ_QUEUE_PROFILES_EDIT_DIALOG_TYPES.CREATE
        })
      } else {
        this.$store.commit(
          `${PQ_QUEUE_PROFILES_STORE_MODULE_NAME}/${PQ_QUEUE_PROFILES_MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY}`,
          true
        );
      }
    },

    handleCreatePQWarehouse() {
      if (this.userHasCompany) {
        this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, {
          show: true,
          type: PQ_WAREHOUSES_EDIT_DIALOG_TYPES.CREATE
        })
      } else {
        this.$store.commit(
          `${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY}`,
          true
        );
      }
    },

    handleCreateQueue() {
      if (this.userHasCompany) {
        this.$store.dispatch(`${PQ_QUEUES_MODULE_NAME}/${PQ_QUEUES_ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
          show: true,
          type: PQ_EDIT_DIALOG_TYPES.CREATE
        })
      } else {
        this.$store.commit(
          `${PQ_QUEUES_MODULE_NAME}/${PQ_QUEUES_MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY}`,
          true
        );
      }
    },

    handleCreateNewPQParking() {
      if (this.userHasCompany) {
        this.$store.dispatch(
          `${PQ_PARKINGS_STORE_MODULE_NAME}/${
            PQ_PARKINGS_ACTIONS_KEYS.SHOW_EDIT_DIALOG
          }`,
          {
            show: true,
            type: PQ_PARKINGS_EDIT_DIALOG_TYPES.CREATE
          }
        );
      } else {
        this.$store.commit(
          `${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY}`,
          true
        );
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.CreateNewMenu {
  // padding: 15px 0;
  // margin: {
  //   left: 30px;
  // }

  &__icon {
    display: flex;
    color: #606266;
    cursor: pointer;
    //font-weight: 500;
    outline: none;
    margin-right: 25px;
    padding: 12px 14px;
    border-radius: 50%;
    transition: 0.5s;

    &:hover {
      background: rgba(175, 176, 178, 0.28);
    }
  }

  &__item {
    line-height: 16px;

    &.is-disabled .CreateNewMenu__item-link-content {
       color: $--color-info !important;
    }
  }

  &__item:not(.is-disabled):hover,
  &__item:focus {
    background-color: rgba(254, 205, 52, 0.15) !important;
    color: #606266 !important;
  }

  &__item-link {
    margin: 0 -20px;

    &:hover {
      border-left: 2px solid #fecd34;
      margin: 0 -22px 0 -20px;
    }

    &-content {
      color: #606266 !important;
      width: 100%;
      text-align: left;
      display: block;
      padding: 10px 20px;
    }
  }

  &__access {
    padding: 5px 20px;
  }
}

.el-dropdown-menu {
  border-radius: 10px !important;
  top: 54px !important;
}

.overrided-margin {
  margin-top: 10px;
}
</style>
