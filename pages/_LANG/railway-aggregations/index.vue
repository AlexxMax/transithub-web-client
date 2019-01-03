<template>
  <div id="RailwayAggregations">
    <el-row>
      <el-col :xs="24" :md="4">
        <BackButton :text="$t('forms.common.back')"/>
      </el-col>

      <el-col :xs="24" :md="16">
        <div class="RailwayAggregations__list">

          <div class="RailwayAggregations__list-header">
            <span class="RailwayAggregations__list-header-title">
              {{ $t('links.documents.railwayAggregations') }}
            </span>

            <div class="RailwayAggregations__list-header-btns">
              <div class="RailwayAggregations__list-header-btns-fs">
                <FilterMenu />
                <!-- <SortingMenu class="RailwayAggregations__list-header-btns-fs-child" /> -->
              </div>

              <Button
                class="RailwayAggregations__list-header-btns-main"
                type="primary"
                @click="handleCreateRailwayAggregation"
              >
                {{ $t('forms.railwayAggregator.createAggregation') }}
              </Button>

              <Button
                class="RailwayAggregations__list-header-btns-menu"
                type=""
                @click="visibleRightMenu = true"
              >
                <fa icon="bars" />
              </Button>
            </div>
          </div>

          <div class="RailwayAggregations__list-items">
            <RailwayAggregationsListItem
              v-for="ra of list"
              :key="ra.guid"
              :row="ra"
              demo
            />
          </div>

          <Button
            v-loading="loading"
            class="RailwayAggregations__list-fetch"
            @click="handleLoadMore"
          >
            <fa icon="sync-alt" />
            {{ $t('forms.common.loadMore') }}
          </Button>

        </div>
      </el-col>
    </el-row>

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityRailwayAggregationsCreateElement')"
    />

    <RightView
      :visible="visibleRightMenu"
      :title="$t('forms.common.menu')"
      @close="visibleRightMenu = false"
    >
      <FilterMenu flat @close="visibleRightMenu = false"/>
      <!-- <SortingMenu flat @close="visibleRightMenu = false"/> -->
    </RightView>
  </div>
</template>

<script>
import BackButton from '@/components/Common/FormElements/Constituents/BackButton'
import Button from '@/components/Common/Buttons/Button'
import RailwayAggregationsListItem from '@/components/RailwayAggregations/ListItem'
import InaccessibleFunctionality from '@/components/Common/InaccessibleFunctionality'
import FilterMenu from '@/components/RailwayAggregations/FilterMenu'
// import SortingMenu from '@/components/RailwayAggregations/SortingMenu'
import RightView from '@/components/Common/RightView'

export default {
  layout: "public",

  components: {
    BackButton,
    Button,
    RailwayAggregationsListItem,
    InaccessibleFunctionality,
    FilterMenu,
    // SortingMenu,
    RightView
  },

  computed: {
    list() {
      return this.$store.state.railwayAggregations.list
    },
    loading() {
      return this.$store.state.railwayAggregations.loading
    }
  },

  data: () => ({
    visibleRightMenu: false
  }),

  methods: {
    async fetch() {
      return await this.$store.dispatch('railwayAggregations/loadMoreItems')
    },
    handleCreateRailwayAggregation() {
      this.$refs['inaccessible-functionality'].show()
    },
    async handleLoadMore() {
      const offset = this.$store.state.railwayAggregations.offset + 10
      this.$store.commit('railwayAggregations/SET_OFFSET', offset)
      await this.fetch()
    }
  },

  fetch({ store }) {
    store.commit('railwayAggregations/RESET')
    return store.dispatch('railwayAggregations/loadMoreItems')
  }
}
</script>

<style lang="scss" scoped>
#RailwayAggregations {
  margin-top: 70px;
  padding: 30px;
  background-color: #FAFAFA;

  .RailwayAggregations__list {
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &-title {
        font-size: 22px;
        font-weight: 700;
        color: #5B5B5B;
      }

      &-btns {
        display: flex;

        &-fs {
          display: flex;

          &-child {
            margin-left: 10px !important;
          }
        }

        &-main {
          margin-left: 20px;
        }

        &-menu {
          display: none;
        }
      }
    }

    &-items {
      margin-top: 20px;
    }
  }
}

@media only screen and (max-width: 1024px) {
  #RailwayAggregations .RailwayAggregations__list .RailwayAggregations__list-header {
    flex-direction: column;
    margin-top: 25px;

    &-title {
      margin-bottom: 15px;
      text-align: center;
    }

    &-btns {

      &-fs {
        display: none;
      }

      &-main {
        margin-left: 0;
        width: 100%;
      }

      &-menu {
        display: block;
      }
    }
  }
}
</style>
