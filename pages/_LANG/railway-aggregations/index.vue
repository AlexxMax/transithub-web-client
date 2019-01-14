<template>
  <div id="RailwayAggregations">
    <el-row>
      <el-col :xs="24" :md="4">
        <BackButton :text="$t('forms.common.back')"/>
      </el-col>

      <el-col :span="24" :md="16">
        <div class="RailwayAggregations__list">

          <div class="RailwayAggregations__list-header">
            <span class="RailwayAggregations__list-header-title">
              {{ $t('links.documents.railwayAggregations') }}
            </span>

             <a
              rel="noopener"
              href="https://t.me/TH_agregator"
              class="RailwayAggregations__list-header-btn-telegram"
              target="_blank">
              <i class="fab fa-telegram-plane"></i>
              {{ $t('forms.common.watchInTelegram') }}
            </a>
          </div>

          <Button
            id="RailwayAggregations__list-primary-mobile-btn"
            type="primary"
            @click="handleCreateRailwayAggregation">
            {{ $t('forms.railwayAggregator.createAggregation') }}
          </Button>

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
                @click="handleCreateRailwayAggregation">
                {{ $t('forms.railwayAggregator.createAggregation') }}
              </Button>
            </ButtonsGroup>

            <div slot="menu-items">
              <Button
                flat
                type="primary"
                @click="handleCreateRailwayAggregation">
                {{ $t('forms.railwayAggregator.createAggregation') }}
              </Button>

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
            @click="handleLoadMore">
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

export default {
  layout: "public",

  components: {
    BackButton,
    Button,
    ButtonsGroup,
    RailwayAggregationsListItem,
    InaccessibleFunctionality,
    FilterMenu,
    Toolbar
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
        border-color: #289cd6;
        border-radius: 3px;
        padding: 9px 15px;
        background-color: #289cd6;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        transition: all .15s ease-in-out;

        &:hover {
          background: #3da5da;
          border-color: #3da5da;
        }

        .svg-inline--fa {
          margin-right: 5px;
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

#RailwayAggregations__list-primary-mobile-btn {
  display: none;
  width: 100%;
  margin-top: 20px;
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

  #RailwayAggregations__list-primary-mobile-btn {
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

  #RailwayAggregations__list-primary-mobile-btn {
    display: block;
  }
}
</style>
