<template>
  <div>
    <el-dropdown
      trigger="click"
      class="CreateNewMenu"
      @visible-change="handleDropdownVisibleChange"
    >
      <Tooltip :content="$t('forms.common.create')" placement="left">
        <span class="CreateNewMenu__icon">
          <fa icon="plus" style="font-size: 15px"/>
        </span>
      </Tooltip>

      <el-dropdown-menu slot="dropdown" style="overflow-x: hidden;">
        <el-dropdown-item class="CreateNewMenu__item">
          <div class="CreateNewMenu__item-link">
            <span
              class="CreateNewMenu__item-link-content"
              @click="handleCreateNewRailwayAggregation"
            >
              {{ $t("forms.railwayAggregator.title") }}
            </span>
          </div>
        </el-dropdown-item>

        <el-dropdown-item class="CreateNewMenu__item" divided>
          <div class="CreateNewMenu__item-link">
            <span
              class="CreateNewMenu__item-link-content"
              @click="$store.dispatch('companies/showCreateNewDialog', true)"
            >
              {{ $t("forms.common.company") }}
            </span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Tooltip from "@/components/Common/Tooltip";

export default {
  name: "th-button-plus",
  components: {
    Tooltip
  },

  data: () => ({ dropdownVisible: false }),

  computed: {
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid;
    }
  },

  methods: {
    handleDropdownVisibleChange(value) {
      this.dropdownVisible = value;
    },
    handleCreateNewRailwayAggregation() {
      if (this.userHasCompany) {
        this.$store.commit("railwayAggregations/SET_CREATE_NEW_DIALOG", true);
      } else {
        this.$store.commit(
          "railwayAggregations/SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY",
          true
        );
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.CreateNewMenu {
  padding: 15px 0;
  margin: {
    left: 30px;
  }

  &__icon {
    display: flex;
    color: #606266;
    cursor: pointer;
    font-weight: 500;
    outline: none;
    margin-right: 25px;
    padding: 12px 14px;
    border-radius: 50%;
    transition: .5s;

    &:hover {
      background: rgba(175, 176, 178, 0.28);
    }
  }

  &__item {
    line-height: 16px;
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
}

.el-dropdown-menu {
  border-radius: 10px !important;
  top: 54px !important;
}
</style>
