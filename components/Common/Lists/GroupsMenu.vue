<template>
  <div :style="{ 'margin-left': leftMargin }">
    <div v-if="flat" class="GroupsMenu__btn-flat" @click="openMenu">
      <fa icon="layer-group"/>
      <span class="GroupsMenu__btn-title">
        {{ `${$t('lists.grouping')}${grouped ? ': ' + $t('lists.set') : ''}` }}
      </span>
    </div>

    <div v-else>
      <el-button-group class="GroupsMenu__btn-group">
        <el-button size="small" @click="openMenu">
          <fa icon="layer-group"/>
          <span class="GroupsMenu__btn-title">
            {{ `${$t('lists.grouping')}${grouped ? ': ' + $t('lists.set') : ''}` }}
          </span>
        </el-button>

        <el-tooltip
          :open-delay="1000"
          class="item"
          effect="dark"
          :content="$t('forms.common.closeAllGroups')"
          placement="bottom">
          <el-button size="small" v-show="grouped" @click="handleGrouping('group')">
            <fa icon="object-group"/>
          </el-button>
        </el-tooltip>

        <el-tooltip
          :open-delay="1000"
          class="item"
          effect="dark"
          :content="$t('forms.common.openAllGroups')"
          placement="bottom">
          <el-button size="small" v-show="grouped" @click="handleGrouping('ungroup')">
            <fa icon="object-ungroup"/>
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>

    <RightView
      :visible="menuVisible"
      :title="$t('lists.grouping')"
      @close="closeMenu">

      <Button
        type="text"
        size="mini"
        :disabled="!grouped"
        style="margin-bottom: 15px"
        @click="clearGroups">
        {{ $t('lists.filters.clear') }}
      </Button>

      <Draggable :list="groups" @end="$emit('changed', groups)">
        <div
          class="GroupMenu__item"
          v-for="(g, index) of groups"
          :key="index">
          <span><fa icon="grip-vertical"/></span>
          <span class="GroupMenu__item-title">{{ g.title }}</span>
          <input class="GroupMenu__item-checkbox" type="checkbox" :checked="g.use" @change="$event => { handleChange(g.name, $event) }"/>
        </div>
      </Draggable>

    </RightView>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'

import EventBus from "@/utils/eventBus"

export default {
  name: 'th-groups-menu',

  components: {
    Draggable,
    Button,
    RightView
  },

  props: {
    groups: {
      type: Array,
      required: true
    },
    grouped: Boolean,
    flat: Boolean
  },

  data() {
    return {
      menuVisible: false,
      leftMargin: '0px'
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
    },
    handleChange(groupName, event) {
      const value = event.target.checked
      const menuGroups = []
      for (const g of this.groups) {
        const ng = {
          name: g.name,
          title: g.title,
          use: g.name === groupName ? value : g.use
        }
        menuGroups.push(ng)
      }
      this.$emit('changed', menuGroups)
    },
    clearGroups() {
      const menuGroups = this.groups.map(group => ({ ...group, use: false }))
      this.$emit('changed', menuGroups)
    },
    handleGrouping(type) {
      this.$emit('grouping', type)
    }
  },

  created() {
    EventBus.$on('workspace-changed', () => {
      this.menuVisible = false
    })
  },

  mounted() {
    if (this.$parent.$el.className === 'ButtonsGroup' || this.$parent.$parent.$el.className === 'ButtonsGroup') {
      this.leftMargin = '5px'
    }
  }
}
</script>

<style lang="scss" scoped>
.GroupsMenu__btn-flat {
  cursor: pointer;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  border-radius: 5px;

  &:hover {
    background-color: #f8f8f8;
  }
}

.GroupsMenu__btn-group {
  display: flex;
  flex-direction: row;
}

.GroupsMenu__btn-title {
  margin-left: 5px;
}

.GroupMenu__item {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 5px;
  line-height: 1.5;
  margin: 10px 0;
  border: 1px solid #f8f8f8;
  cursor: move;
  color: #606266;

  &:hover {
    background-color: #f8f8f8;
  }

  .GroupMenu__item-title {
    width: 100%;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  .GroupMenu__item-checkbox {
    margin: 5px 0;
    transform: scale(1.2);
  }
}
</style>
