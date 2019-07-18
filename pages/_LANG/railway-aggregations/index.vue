<template>
  <div id="RailwayAggregations">
    <el-row>
      <el-col :xs="24" :md="2">
        <BackButton :text="$t('forms.common.back')"/>
      </el-col>

      <el-col :span="24" :md="20">
        <div class="RailwayAggregations__list">

          <div class="RailwayAggregations__list-header">
            <span class="RailwayAggregations__list-header-title">
              {{ $t('links.documents.railwayAggregations') }}
            </span>
          </div>
        <!-- <Button
            class="RailwayAggregations__list-primary-mobile-btn"
            type="primary"
            round
            @click="handleCreateRailwayAggregation">
            {{ $t('forms.railwayAggregator.createAggregation') }}
          </Button>

          <ButtonTelegram class="RailwayAggregations__list-primary-mobile-btn"/> -->

          <Toolbar
            slot="toolbar"
            ref="toolbar"
            @onSearch="handleSearch">

            <ButtonsGroup class="RailwayAggregations__list-btns" slot="items">
              <div class="RailwayAggregations__list-btns-fs">
                <FilterMenu
                  @close="closeToolbar"
                />
              </div>
            </ButtonsGroup>

            <ButtonsGroup>
              <Button
                class="RailwayAggregations__list-btns-main"
                type="primary"
                round
                @click="handleCreateRailwayAggregation">
                {{ $t('forms.railwayAggregator.createAggregation') }}
              </Button>

              <ButtonTelegram style="margin-left: 7px;" wide/>
            </ButtonsGroup>

            <div slot="menu-items">
              <Button
                class="RailwayAggregations__right-view-btn"
                flat
                type="primary"
                round
                @click="handleCreateRailwayAggregation">
                {{ $t('forms.railwayAggregator.createAggregation') }}
              </Button>

              <ButtonTelegram 
                class="RailwayAggregations__right-view-btn"
                flat
              />

              <FilterMenu flat @close="closeToolbar"/>
            </div>

          </Toolbar>

          <div>
            <RailwayAggregationsListItem
              v-for="(ra, index) of list"
              :key="index"
              :row="ra"
              demo
            />
          </div>

          <Button
            v-loading="loading"
            class="RailwayAggregations__list-fetch"
            @click="handleLoadMore"
            round>
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
  </div>
</template>

<script>
import BackButton from '@/components/Common/FormElements/Constituents/BackButton'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import RailwayAggregationsListItem from '@/components/RailwayAggregations/ListItem'
import InaccessibleFunctionality from '@/components/Common/InaccessibleFunctionality'
import FilterMenu from '@/components/RailwayAggregations/FilterMenu'
import Toolbar from '@/components/Common/Lists/Toolbar'
import ButtonTelegram from '@/components/Common/Buttons/ButtonTelegram'

export default {
  layout: "public",

  components: {
    BackButton,
    Button,
    ButtonsGroup,
    RailwayAggregationsListItem,
    InaccessibleFunctionality,
    FilterMenu,
    Toolbar,
    ButtonTelegram
  },

  computed: {
    list() {
      return this.$store.state.railwayAggregations.list
    },
    loading() {
      return this.$store.state.railwayAggregations.loading
    }
  },

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
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    },
    handleSearch(value) {
      this.$store.dispatch('railwayAggregations/setSearch', value)
    },
  },

  fetch({ store }) {
    store.commit('railwayAggregations/RESET')
    return store.dispatch('railwayAggregations/loadMoreItems')
  }
}
</script>

<style lang="scss" scoped>
#RailwayAggregations {
  margin-top: 80px;
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
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        color: #5B5B5B;
      }

      &-btn-telegram {
        font-size: 12px;
        font-weight: 500;
        color: #fff;
        border-color: #27A5E7;
        border-radius: 3px;
        padding: 9px 18px;
        background-color: #27A5E7;;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        transition: all .3s ease-in-out;
        border-radius: 20px;

        &:hover {
          box-shadow: 0px 0px 5px 0px #27A5E7;
          //transform: translateY(-5px);
        }

        .svg-inline--fa {
          border-right: 1px solid rgba(255,255,255,0.35);
          margin-right: 5px;
          padding-right: 10px;
        }
      }
    }

    &-btns {
      display: flex;
      flex-direction: row;

      &-fs {
        margin-left: 10px;
        display: flex;

        &-child {
          margin-left: 10px !important;
        }
      }

      &-main {
        margin-left: 20px;
      }
    }
  }
}

.RailwayAggregations__list-primary-mobile-btn {
  display: none;
  width: 100% !important;
  margin-top: 20px;
}

.RailwayAggregations__right-view-btn {
  width: 100% !important;
}

@media only screen and (max-width: 560px) {
  #RailwayAggregations .RailwayAggregations__list {
    &-header {
      flex-direction: column;

      &-btn-telegram {
        margin-top: 25px;
      }
    }
  }

  .RailwayAggregations__list-primary-mobile-btn {
    display: block;
  }
}

@media only screen and (max-width: 1024px) {
  #RailwayAggregations .RailwayAggregations__list {
    &-btns {
      margin-top: 25px;

      &-fs {
        display: none;
      }

      &-main {
        margin-left: 0;
        width: 100%;
      }
    }
  }
}
</style>