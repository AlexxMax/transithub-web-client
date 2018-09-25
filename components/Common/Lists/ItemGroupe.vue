<template>
  <div>
    <div class="ListItemGroupe__wrapper">
      <div class="ListItemGroupe">
        <div class="ListItemGroupe__header" @click="$emit('onClick')">
          <div class="ListItemGroupe__title">{{ title }}</div>
          <div class="ListItemGroupe__subtitle">{{ subtitle }}</div>
        </div>

        <Collapse>
          <div class="ListItemGroupe__body" v-show="collapse">
            <slot/>
          </div>
        </Collapse>

        <div class="ListItemGroupe__footer" @click="toogleList">
          {{ collapseTitle }}
        </div>
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
    subtitle: {
      type: String,
      required: true
    },
    count: Number
  },

  data() {
    return {
      collapse: true
    }
  },

  computed: {
    collapseTitle() {
      if (this.collapse) {
        return this.$t('lists.collapseClose')
      }

      if (this.count && this.count > 0) {
        return `${this.$t('lists.collapseOpen')} (${this.count})`
      }

      return this.$t('lists.collapseOpen')
    }
  },

  methods: {
    toogleList() {
      this.collapse = !this.collapse
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

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .ListItemGroupe__header {
      cursor: pointer;
      padding: 10px 0;

      &:hover {
        text-decoration: underline;
        color: #FECD34;

        .ListItemGroupe__subtitle {
          color: #FECD34;
        }
      }

      .ListItemGroupe__title {
        color: #FECD34;
      }

      .ListItemGroupe__subtitle {
        font-size: 13px;
        color: #909399;
        padding-top: 5px;
      }
    }

    .ListItemGroupe__body {
      padding: 5px 0;
      margin: 0 -5px;
    }

    .ListItemGroupe__footer {
      text-align: center;
      padding: 10px;
      color: #909399;
      cursor: pointer;
      margin: 0 -21px -11px;
      border-radius: 0 0 5px 5px;
      font-size: 13px;
      font-weight: 500;

      &:hover {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>
