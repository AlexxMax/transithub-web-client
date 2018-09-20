<template>
  <el-col :xs="widthXs" :md="widthMd">
    <div>
      <div v-if="menu">
        <el-dropdown class="ItemSegment__dropdown" @command="handleCommand">
          <span class="ItemSegment__value el-dropdown-link">
            <span class="ItemSegment__title ItemSegment__title-center">{{ title }}</span>
            <i class="ItemSegment__arrow el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(mi, index) of menuItems"
              :key="index"
              :command="mi.command">
              {{ mi.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div v-else @click="$emit('onClick', name)">
        <span class="ItemSegment__title">{{ title }}</span>

        <div v-if="complex" class="ItemSegment__complex">
          <CompanyAvatar
            v-if="value"
            :style="'margin-right: 5px;'"
            :name="value || ' '" />
          <p class="ItemSegment__value">
            {{ value }}
          </p>
        </div>

        <p v-else
          :class="{ ItemSegment__value: true, ItemSegment__primary: primary }"
          :style="getSpecialStyle()"
          >
          {{ value }}
        </p>
      </div>
    </div>
  </el-col>
</template>

<script>
import CompanyAvatar from '@/components/Companies/CompanyAvatar'

export default {
  name: 'th-list-item-segment',

  components: {
    CompanyAvatar
  },

  props: {
    name: {
      type: String,
      required: true
    },
    widthMd: {
      type: Number,
      required: true
    },
    widthXs: {
      type: Number,
      required: true
    },
    title: String,
    value: [ String, Number ],
    primary: Boolean,
    complex: Boolean,
    special: Boolean,
    "special-color": String,
    menu: Boolean,
    "menu-items": Array,
    "menu-commands": Object
  },

  methods: {
    getSpecialStyle() {
      return {
        'text-transform': 'capitalize',
        'color': this.specialColor
      }
    },
    handleCommand(command) {
      if (command) {
        this.menuCommands[command].call(this)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ItemSegment__primary {
  color: #FECD34;
}

.ItemSegment__complex {
  display: flex;
  flex-direction: row;
}

.ItemSegment__title {
  display: none;

  &.ItemSegment__title-center {
    text-align: center;
  }
}

.ItemSegment__value {
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
}

.ItemSegment__dropdown {
  width: 100%;

  .ItemSegment__arrow {
    margin: auto;
  }
}

@media only screen and (max-width: 990px) {
  .ItemSegment__client {
    margin-bottom: 10px;

    .ItemSegment__value {
      margin-top: 0;
      height: 40px;
      margin-bottom: 0;
    }
  }

  .ItemSegment__title {
    font-size: 12px;
    font-weight: 200;
    color: #606266;
    display: block;
  }

  .ItemSegment__value {
    margin-top: 0;
    height: 20px;
    margin-bottom: 10px;
  }
}
</style>
