<template>
  <div>
    <div class="ListItemGroupe__wrapper">
      <div class="ListItemGroupe">
        <div class="ListItemGroupe__header">
          <div class="ListItemGroupe__arrow" @click="toogleList">
            <fa :icon="collapse ? 'caret-down' : 'caret-right'"/>
          </div>

          <div class="ListItemGroupe__title-items">
            <div
              :class="{ 'ListItemGroupe__title': true, 'ListItemGroupe__title-link': isLink }"
              @click="handleTitleClick">
              {{ title }}
            </div>
            <div
              v-if="subtitle"
              class="ListItemGroupe__subtitle"
              @click="$emit('onClick')">
              {{ subtitle }}
            </div>
          </div>

          <el-badge class="ListItemGroupe__badge" :value="count"/>
        </div>

        <Collapse>
          <div class="ListItemGroupe__body" v-show="collapse">
            <slot/>
          </div>
        </Collapse>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from '@/components/Common/Transitions/Collapse'

export default {
  name: 'th-item-groupe',

  components: {
    Collapse
  },

  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    count: Number,
    isLink: Boolean
  },

  data() {
    return {
      collapse: true
    }
  },

  methods: {
    toogleList() {
      this.collapse = !this.collapse
    },
    handleTitleClick() {
      if (this.isLink) {
        this.$emit('onClick')
      } else {
        this.toogleList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ListItemGroupe__wrapper {
  margin: 10px 0;
  padding: 0 5px;

  .ListItemGroupe {
    padding: 10px 20px;
    border: 1px solid #bebebe1a;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .ListItemGroupe__header {
      cursor: pointer;
      padding: 10px 0;
      display: flex;
      flex-direction: row;

      &:hover {
        text-decoration: underline;
        color: #FECD34;

        .ListItemGroupe__subtitle {
          color: #FECD34;
        }
      }

      .ListItemGroupe__arrow {
        margin-right: 15px;
        width: 10px;
      }

      .ListItemGroupe__title-items {
        display: flex;
        flex-direction: column;

        .ListItemGroupe__title {
          font-weight: 500;

          &.ListItemGroupe__title-link {
            color: #FECD34;
          }
        }

        .ListItemGroupe__subtitle {
          font-size: 13px;
          color: #909399;
          padding-top: 5px;
        }
      }

      .ListItemGroupe__badge {
        margin-left: 15px;
        margin-top: -2px;
      }
    }

    .ListItemGroupe__body {
      padding: 5px 0;
      margin: 0 -5px;
    }
  }
}
</style>
