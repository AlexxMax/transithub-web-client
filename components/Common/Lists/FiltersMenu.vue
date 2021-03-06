<template>
  <div :style="{ 'margin-left': leftMargin }">

    <template v-if="floating">
      <div v-if="flat" class="FiltersMenu__btn-flat" @click="openMenu">
        <fa icon="filter"/>
        <span class="FiltersMenu__btn-title">
          {{ `${$t('lists.filter')}${filterSet ? ': ' + $t('lists.set') : ''}` }}
        </span>
      </div>

      <Button
        v-else
        :type="null"
        round
        plain
        fa-icon="filter"
        @click="openMenu"
      >
        {{ $t('lists.filter') }}
      </Button>

      <RightView
        :body-overflow-y="false"
        :visible="menuVisible"
        :title="$t('lists.filter')"
        @close="closeMenu">

        <el-tabs v-model="activeTab">
          <el-tab-pane :label="$t('forms.common.all')" :name="TABS.all">
            <FiltersAll
              big-height
              use-save
              :filter-set="filterSet"
              :btn-save-loading="savedFiltersLoading"
              @clear-filters="$emit('clear-filters')"
              @save-filters="$emit('save-filters')"
            >
              <slot/>
            </FiltersAll>
          </el-tab-pane>

          <el-tab-pane v-if="useSaveFilters" :label="$t('forms.common.saved')" :name="TABS.saved">
            <FiltersSaved
              :loading="savedFiltersLoading"
              :items="savedFiltersItems"
              :loaders="loaders"
              :needSubscription="needSubscription"
              @set-filters="filters => $emit('set-filters', filters)"
              @remove-filters="guid => $emit('remove-filters', guid)"
              @change-subscription="(guid, sendNotifications) => $emit('change-subscription', guid, sendNotifications)"
            />
          </el-tab-pane>
        </el-tabs>

      </RightView>
    </template>

    <template v-else>
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="$t('forms.common.all')" :name="TABS.all">
          <FiltersAll
            :scroll="false"
            use-save
            :filter-set="filterSet"
            :btn-save-loading="savedFiltersLoading"
            @clear-filters="$emit('clear-filters')"
            @save-filters="$emit('save-filters')"
          >
            <slot/>
          </FiltersAll>
        </el-tab-pane>

        <el-tab-pane v-if="useSaveFilters" :label="$t('forms.common.saved')" :name="TABS.saved">
          <FiltersSaved
            :scroll="false"
            :loading="savedFiltersLoading"
            :items="savedFiltersItems"
            :loaders="loaders"
            :needSubscription="needSubscription"
            @set-filters="filters => $emit('set-filters', filters)"
            @remove-filters="guid => $emit('remove-filters', guid)"
            @change-subscription="(guid, sendNotifications) => $emit('change-subscription', guid, sendNotifications)"
          />
        </el-tab-pane>
      </el-tabs>
    </template>

  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'
import FiltersAll from '@/components/Common/Lists/Filters/FiltersAllList'
import FiltersSaved from '@/components/Common/Lists/Filters/FiltersSavedList'

import EventBus from "@/utils/eventBus"

const TABS = {
  all: 'all-filters',
  saved: 'saved-filters'
}

export default {
  name: 'th-filters-menu',

  components: {
    Button,
    RightView,
    FiltersAll,
    FiltersSaved
  },

  props: {
    filterSet: Boolean,
    flat: Boolean,
    useSaveFilters: Boolean,
    savedFiltersLoading: Boolean,
    savedFiltersItems: Array,
    loaders: Array,
    needSubscription: {
      type: Boolean,
      default: true
    },
    floating: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      menuVisible: false,
      leftMargin: '0px',
      activeTab: TABS.all
    }
  },

  methods: {
    openMenu() {
      this.menuVisible = true
      this.$emit('open')
    },
    closeMenu() {
      this.menuVisible = false
      this.$emit('close')
    }
  },

  created() {
    EventBus.$on('workspace-changed', () => {
      this.menuVisible = false
    })

    this.TABS = TABS
  },

  mounted() {
    if (this.$parent.$el.className === 'ButtonsGroup' || this.$parent.$parent.$el.className === 'ButtonsGroup') {
      this.leftMargin = '5px'
    }
  }
}
</script>

<style lang="scss" scoped>
.FiltersMenu__btn-flat {
  cursor: pointer;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  border-radius: 5px;

  &:hover {
    background-color: #f8f8f8;
  }
}

.FiltersMenu__btn-title {
  margin-left: 5px;
}
</style>
